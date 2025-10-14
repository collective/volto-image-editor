/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import { Button, Dimmer, Grid } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { injectIntl } from 'react-intl';
import deleteSVG from '@plone/volto/icons/delete.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import loadable from '@loadable/component';
import { validateFileUploadSize } from '@plone/volto/helpers/FormValidation/FormValidation';
import { defineMessages, useIntl } from 'react-intl';
import Image from '@plone/volto/components/theme/Image/Image';
import { toast } from 'react-toastify';
import ImageEditorWrapper from '../ImageEditor/ImageEditorWrapper';
import './FileWidget.scss';
import { useUpdateEffect } from 'react-advanced-cropper';

const imageMimetypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
];
const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  releaseDrag: {
    id: 'Drop files here ...',
    defaultMessage: 'Drop files here ...',
  },
  editFile: {
    id: 'Drop file here to replace the existing file',
    defaultMessage: 'Drop file here to replace the existing file',
  },
  fileDrag: {
    id: 'Drop file here to upload a new file',
    defaultMessage: 'Drop file here to upload a new file',
  },
  replaceFile: {
    id: 'Replace existing file',
    defaultMessage: 'Replace existing file',
  },
  addNewFile: {
    id: 'Choose a file',
    defaultMessage: 'Choose a file',
  },
  maxSizeError: {
    id: 'The file you uploaded exceeded the maximum allowed size of {size} bytes',
    defaultMessage:
      'The file you uploaded exceeded the maximum allowed size of {size} bytes',
  },
  acceptError: {
    id: 'File is not of the accepted type {accept}',
    defaultMessage: 'File is not of the accepted type {accept}',
  },
});

const FileWidget = (props) => {
  const { id, value, onChange, isDisabled } = props;
  const [data, setData] = React.useState(null);
  const isImage = value && imageMimetypes.includes(value['content-type']);
  const mainColumnWidth = isImage ? 10 : 12;
  const intl = useIntl();

  const imgAttrs = React.useMemo(() => {
    const imgObj = {};
    if (value?.download) {
      imgObj.item = {
        '@id': value.download.substring(0, value.download.indexOf('/@@images')),
        image: value,
      };
    } else if (value?.data) {
      imgObj.src = `data:${value['content-type']};${value.encoding},${value.data}`;
    }
    return imgObj;
  }, [value]);

  useUpdateEffect(() => {
    if (data) {
      onChange(id, data);
    }
  }, [data]);

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (files, rejectedFiles) => {
    rejectedFiles.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.maxSizeError, {
                size: props.size,
              })}
            />,
          );
        }

        if (err.code === 'file-invalid-type') {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.acceptError, {
                accept: props.accept,
              })}
            />,
          );
        }
      });
    });
    if (files.length < 1) return;
    const file = files[0];
    if (!validateFileUploadSize(file, intl.formatMessage)) return;
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      onChange(id, {
        data: fields[3],
        encoding: fields[2],
        'content-type': fields[1],
        filename: file.name,
      });
    });

    let reader = new FileReader();
    reader.onload = function () {
      const fields = reader.result.match(/^data:(.*);(.*),(.*)$/);
      if (imageMimetypes.includes(fields[1])) {
        let imagePreview = document.getElementById(`field-${id}-image`);
        if (imagePreview) imagePreview.src = reader.result;
      }
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <FormFieldWrapper {...props}>
      <Grid className="image-widget-grid">
        <Grid.Row stretched>
          <Grid.Column stretched width={mainColumnWidth}>
            <Dropzone
              onDrop={onDrop}
              {...(props.size ? { maxSize: props.size } : {})}
              {...(props.accept ? { accept: props.accept } : {})}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div className="file-widget-dropzone" {...getRootProps()}>
                  {isDragActive && <Dimmer active></Dimmer>}
                  {isImage ? (
                    <Image
                      className="image-preview small ui image"
                      id={`field-${id}-image`}
                      {...imgAttrs}
                    />
                  ) : (
                    <div className="dropzone-placeholder">
                      {isDragActive ? (
                        <p className="dropzone-text">
                          {intl.formatMessage(messages.releaseDrag)}
                        </p>
                      ) : value ? (
                        <p className="dropzone-text">
                          {intl.formatMessage(messages.editFile)}
                        </p>
                      ) : (
                        <p className="dropzone-text">
                          {intl.formatMessage(messages.fileDrag)}
                        </p>
                      )}
                    </div>
                  )}

                  <label className="label-file-widget-input">
                    {value
                      ? intl.formatMessage(messages.replaceFile)
                      : intl.formatMessage(messages.addNewFile)}
                  </label>
                  <input
                    {...getInputProps({
                      type: 'file',
                      style: { display: 'none' },
                    })}
                    id={`field-${id}`}
                    name={id}
                    type="file"
                    disabled={isDisabled}
                  />
                </div>
              )}
            </Dropzone>
            <div className="field-file-name">
              {value && (
                <UniversalLink href={value.download} download={true}>
                  {value.filename}
                </UniversalLink>
              )}
              {value && (
                <>
                  <Button
                    type="button"
                    icon
                    basic
                    className="delete-button"
                    aria-label="delete file"
                    disabled={isDisabled}
                    onClick={() => {
                      onChange(id, null);
                    }}
                  >
                    <Icon name={deleteSVG} size="20px" />
                  </Button>
                </>
              )}
            </div>
          </Grid.Column>
          {isImage && (
            <Grid.Column stretched width="2" className={'image-editor-cta'}>
              <ImageEditorWrapper value={value} setData={setData} />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </FormFieldWrapper>
  );
};

export default injectIntl(FileWidget);
