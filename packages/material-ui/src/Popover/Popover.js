import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import {
  chainPropTypes,
  deepmerge,
  elementTypeAcceptingRef,
  refType,
  HTMLElementType,
} from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import debounce from '../utils/debounce';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import Grow from '../Grow';
import Modal from '../Modal';
import Paper from '../Paper';
import popoverClasses, { getPopoverUtilityClass } from './popoverClasses';

export function getOffsetTop(rect, vertical) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

export function getOffsetLeft(rect, horizontal) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent, child) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const overridesResolver = (props, styles) => {
  return deepmerge(styles.root || {}, {
    [`& .${popoverClasses.paper}`]: styles.paper,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
    paper: ['paper'],
  };

  return composeClasses(slots, getPopoverUtilityClass, classes);
};

const PopoverRoot = experimentalStyled(
  Modal,
  {},
  {
    name: 'MuiPopover',
    slot: 'Root',
    overridesResolver,
  },
)({});

const PopoverPaper = experimentalStyled(
  Paper,
  {},
  {
    name: 'MuiPopover',
    slot: 'Paper',
  },
)({
  position: 'absolute',
  overflowY: 'auto',
  overflowX: 'hidden',
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: 'calc(100% - 32px)',
  maxHeight: 'calc(100% - 32px)',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
});

const Popover = React.forwardRef(function Popover(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiPopover' });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    anchorPosition,
    anchorReference = 'anchorEl',
    children,
    className,
    container: containerProp,
    elevation = 8,
    getContentAnchorEl,
    marginThreshold = 16,
    open,
    PaperProps = {},
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    TransitionComponent = Grow,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps: { onEntering, ...TransitionProps } = {},
    ...other
  } = props;
  const paperRef = React.useRef();

  const styleProps = {
    ...props,
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    PaperProps,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps,
  };

  const classes = useUtilityClasses(styleProps);

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  const getAnchorOffset = React.useCallback(
    (contentAnchorOffset) => {
      if (anchorReference === 'anchorPosition') {
        if (process.env.NODE_ENV !== 'production') {
          if (!anchorPosition) {
            console.error(
              'Material-UI: You need to provide a `anchorPosition` prop when using ' +
                '<Popover anchorReference="anchorPosition" />.',
            );
          }
        }
        return anchorPosition;
      }

      const resolvedAnchorEl = getAnchorEl(anchorEl);

      // If an anchor element wasn't provided, just use the parent body element of this Popover
      const anchorElement =
        resolvedAnchorEl && resolvedAnchorEl.nodeType === 1
          ? resolvedAnchorEl
          : ownerDocument(paperRef.current).body;
      const anchorRect = anchorElement.getBoundingClientRect();

      if (process.env.NODE_ENV !== 'production') {
        const box = anchorElement.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          console.warn(
            [
              'Material-UI: The `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      }

      const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
        left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      };
    },
    [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference],
  );

  // Returns the vertical offset of inner content to anchor the transform on if provided
  const getContentAnchorOffset = React.useCallback(
    (element) => {
      let contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        const contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && element.contains(contentAnchorEl)) {
          const scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset =
            contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
        }

        // != the default value
        if (process.env.NODE_ENV !== 'production') {
          if (anchorOrigin.vertical !== 'top') {
            console.error(
              [
                'Material-UI: You can not change the default `anchorOrigin.vertical` value ',
                'when also providing the `getContentAnchorEl` prop to the popover component.',
                'Only use one of the two props.',
                'Set `getContentAnchorEl` to `null | undefined`' +
                  ' or leave `anchorOrigin.vertical` unchanged.',
              ].join('\n'),
            );
          }
        }
      }

      return contentAnchorOffset;
    },
    [anchorOrigin.vertical, anchorReference, getContentAnchorEl],
  );

  // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use
  const getTransformOrigin = React.useCallback(
    (elemRect, contentAnchorOffset = 0) => {
      return {
        vertical: getOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical],
  );

  const getPositioningStyle = React.useCallback(
    (element) => {
      // Check if the parent has requested anchoring on an inner content node
      const contentAnchorOffset = getContentAnchorOffset(element);
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(elemRect, contentAnchorOffset);

      if (anchorReference === 'none') {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      }

      // Get the offset of of the anchoring element
      const anchorOffset = getAnchorOffset(contentAnchorOffset);

      // Calculate element positioning
      let top = anchorOffset.top - elemTransformOrigin.vertical;
      let left = anchorOffset.left - elemTransformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      // Use the parent window of the anchorEl if provided
      const containerWindow = ownerWindow(getAnchorEl(anchorEl));

      // Window thresholds taking required margin into account
      const heightThreshold = containerWindow.innerHeight - marginThreshold;
      const widthThreshold = containerWindow.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        const diff = top - marginThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        const diff = bottom - heightThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
          console.error(
            [
              'Material-UI: The popover component is too tall.',
              `Some part of it can not be seen on the screen (${
                elemRect.height - heightThreshold
              }px).`,
              'Please consider adding a `max-height` to improve the user-experience.',
            ].join('\n'),
          );
        }
      }

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      }

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [
      anchorEl,
      anchorReference,
      getAnchorOffset,
      getContentAnchorOffset,
      getTransformOrigin,
      marginThreshold,
    ],
  );

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element) {
      return;
    }

    const positioning = getPositioningStyle(element);

    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);

  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }

    setPositioningStyles();
  };

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });

  React.useImperativeHandle(
    action,
    () =>
      open
        ? {
            updatePosition: () => {
              setPositioningStyles();
            },
          }
        : null,
    [open, setPositioningStyles],
  );

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleResize = debounce(() => {
      setPositioningStyles();
    });

    const containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  const container =
    containerProp || (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);

  return (
    <PopoverRoot
      BackdropProps={{ invisible: true }}
      className={clsx(classes.root, className)}
      container={container}
      open={open}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        onEntering={handleEntering}
        timeout={transitionDuration}
        {...TransitionProps}
      >
        <PopoverPaper
          elevation={elevation}
          ref={paperRef}
          {...PaperProps}
          className={clsx(classes.paper, PaperProps.className)}
        >
          {children}
        </PopoverPaper>
      </TransitionComponent>
    </PopoverRoot>
  );
});

Popover.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: refType,
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the popover.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), (props) => {
    if (props.open && (!props.anchorReference || props.anchorReference === 'anchorEl')) {
      const resolvedAnchorEl = getAnchorEl(props.anchorEl);

      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          return new Error(
            [
              'Material-UI: The `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      } else {
        return new Error(
          [
            'Material-UI: The `anchorEl` prop provided to the component is invalid.',
            `It should be an Element instance but it's \`${resolvedAnchorEl}\` instead.`,
          ].join('\n'),
        );
      }
    }

    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.oneOf(['center', 'left', 'right']),
      PropTypes.number,
    ]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number])
      .isRequired,
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: PropTypes.number,
  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` prop.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: PropTypes.func,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * @default 16
   */
  marginThreshold: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    component: elementTypeAcceptingRef,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.oneOf(['center', 'left', 'right']),
      PropTypes.number,
    ]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number])
      .isRequired,
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
};

export default Popover;
