import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Dialog, Modal } from '@plone/components';
import { DialogTrigger } from 'react-aria-components';
import ImageEditor from '@plone-collective/volto-image-editor/components/ImageEditor/ImageEditor';
import '@plone/components/dist/basic.css';
import './ImageEditorWrapper.scss';

function parseDataURL(
  dataURL: string,
  value: object,
): {
  data: string;
  encoding: string;
  'content-type': string;
  filename: string;
} {
  const match = /^data:(.+?);(base64),(.+)$/.exec(dataURL);
  if (!match) {
    throw new Error('Invalid data URL format');
  }

  const [, contentType, encoding, data] = match;

  const extension = contentType.split('/')[1] || 'bin';
  const filename = value?.filename
    ? value.filename
    : `image-${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, '0')}.${extension}`;

  return {
    data,
    encoding,
    'content-type': contentType,
    filename,
  };
}

const ImageEditorWrapper = ({ value, setData }) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (value?.download) {
      setSrc(value.download);
    } else if (value?.data) {
      const newSrc = `data:${value['content-type']};base64,${value.data}`;
      setSrc(newSrc);
    } else {
      setSrc('');
    }
  }, [value]);

  const [isOpen, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onImageSave = (newData) => {
    setOpen(false);
    const newValue = parseDataURL(newData, value);
    setData(newValue);
  };

  return (
    <div className="image-widget">
      <div className="image-widget-cropper">
        <DialogTrigger>
          <Button onPress={() => setOpen(true)}>
            <FormattedMessage id="Edit image" defaultMessage="Edit image" />
          </Button>
          <Modal
            className={'react-aria-Modal image-cropper-modal'}
            isDismissable={true}
            isOpen={isOpen}
          >
            <Dialog>
              {() => (
                <ImageEditor
                  key={'default-cropper'}
                  src={src}
                  onImageSave={onImageSave}
                  onCancel={onClose}
                />
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
      </div>
    </div>
  );
};

export default ImageEditorWrapper;
