import loadable from '@loadable/component';

export const FileWidget = loadable(
  () =>
    import(
      /* webpackChunkName: "Widgets" */ '@plone-collective/volto-image-editor/components/Widgets/FileWidget'
    ),
);
