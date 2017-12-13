import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Textarea from './Textarea';
import Input, { hasValue, isDirty } from './Input';
import InputAdornment from './InputAdornment';

const NakedInput = unwrap(Input);

describe('<Input />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ untilSelector: 'Input' });
    mount = createMount();
    classes = getClasses(<Input />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<Input />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.inkbar), true, 'should have the inkbar class');
    assert.strictEqual(
      wrapper.hasClass(classes.underline),
      true,
      'should have the underline class',
    );
  });

  it('should render an <input /> inside the div', () => {
    const wrapper = shallow(<Input />);
    const input = wrapper.find('input');
    assert.strictEqual(input.name(), 'input');
    assert.strictEqual(input.props().type, 'text', 'should pass the text type prop');
    assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
    assert.strictEqual(input.props().required, undefined);
  });

  describe('multiline', () => {
    it('should render an <Textarea /> when passed the multiline prop', () => {
      const wrapper = shallow(<Input multiline />);
      assert.strictEqual(wrapper.find(Textarea).length, 1);
    });

    it('should render an <textarea /> when passed the multiline and rows props', () => {
      const wrapper = shallow(<Input multiline rows="4" />);
      assert.strictEqual(wrapper.find('textarea').length, 1);
    });

    it('should forward the value to the Textarea', () => {
      const wrapper = shallow(<Input multiline rowsMax="4" value="" />);
      assert.strictEqual(wrapper.find(Textarea).props().value, '');
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const wrapper = shallow(<Input disabled />);
      const input = wrapper.find('input');
      assert.strictEqual(input.name(), 'input');
      assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
      assert.strictEqual(
        input.hasClass(classes.inputDisabled),
        true,
        'should have the disabled class',
      );
    });

    it('should reset the focused state', () => {
      const wrapper = shallow(<Input />);
      const handleBlur = spy();
      wrapper.setContext({
        ...wrapper.context(),
        muiFormControl: {
          onBlur: handleBlur,
        },
      });
      // We simulate a focused input that is getting disabled.
      wrapper.setState({
        focused: true,
      });
      wrapper.setProps({
        disabled: true,
      });
      assert.strictEqual(wrapper.state().focused, false);
      assert.strictEqual(handleBlur.callCount, 1);
    });

    // IE11 bug
    it('should not respond the the focus event when disabled', () => {
      const wrapper = shallow(<Input disabled />);
      const instance = wrapper.instance();
      const event = {
        stopPropagation: spy(),
      };
      instance.handleFocus(event);
      assert.strictEqual(event.stopPropagation.callCount, 1);
    });
  });

  it('should disabled the underline', () => {
    const wrapper = shallow(<Input disableUnderline />);
    const input = wrapper.find('input');
    assert.strictEqual(wrapper.hasClass(classes.inkbar), false, 'should not have the inkbar class');
    assert.strictEqual(input.name(), 'input');
    assert.strictEqual(input.hasClass(classes.input), true, 'should have the input class');
    assert.strictEqual(
      input.hasClass(classes.underline),
      false,
      'should not have the underline class',
    );
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = mount(<Input {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  describe('controlled', () => {
    it('should fire the onDirty callback when moving from uncontrolled to controlled', () => {
      const handleDirty = spy();
      const wrapper = shallow(<Input value={undefined} onDirty={handleDirty} />);
      assert.strictEqual(handleDirty.callCount, 0);
      wrapper.setProps({ value: 'foo' });
      assert.strictEqual(handleDirty.callCount, 1);
    });

    ['', 0].forEach(value => {
      describe(`${typeof value} value`, () => {
        let wrapper;
        let handleDirty;
        let handleClean;

        before(() => {
          handleClean = spy();
          handleDirty = spy();
          wrapper = shallow(<Input value={value} onDirty={handleDirty} onClean={handleClean} />);
        });

        it('should check that the component is controlled', () => {
          const instance = wrapper.instance();
          assert.strictEqual(instance.isControlled(), true, 'isControlled() should return true');
        });

        // don't test number because zero is a dirty state, whereas '' is not
        if (typeof value !== 'number') {
          it('should have called the handleClean callback', () => {
            assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb');
          });

          it('should fire the onDirty callback when dirtied', () => {
            assert.strictEqual(handleDirty.callCount, 0);
            wrapper.setProps({ value: typeof value === 'number' ? 2 : 'hello' });
            assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty cb');
          });

          it('should fire the onClean callback when dirtied', () => {
            assert.strictEqual(
              handleClean.callCount,
              1,
              'should have called the onClean cb once already',
            );
            wrapper.setProps({ value });
            assert.strictEqual(handleClean.callCount, 2, 'should have called the onClean cb again');
          });
        }
      });
    });
  });

  describe('prop: inputComponent', () => {
    it('should accept any html component', () => {
      const wrapper = shallow(<Input inputComponent="span" />);
      assert.strictEqual(wrapper.find('span').length, 1);
    });
  });

  // Note the initial callback when
  // uncontrolled only fires for a full mount
  describe('uncontrolled', () => {
    let wrapper;
    let handleDirty;
    let handleClean;

    before(() => {
      handleClean = spy();
      handleDirty = spy();
      wrapper = mount(
        <NakedInput classes={{}} onDirty={handleDirty} defaultValue="hell" onClean={handleClean} />,
      );
    });

    it('should check that the component is uncontrolled', () => {
      const instance = wrapper.instance();
      assert.strictEqual(instance.isControlled(), false, 'isControlled() should return false');
    });

    it('should fire the onDirty callback when dirtied', () => {
      assert.strictEqual(handleDirty.callCount, 1, 'should not have called the onDirty cb yet');
      wrapper.instance().input.value = 'hello';
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleDirty.callCount, 2, 'should have called the onDirty cb');
    });

    it('should fire the onClean callback when cleaned', () => {
      // Because of shallow() this hasn't fired since there is no mounting
      assert.strictEqual(handleClean.callCount, 0, 'should not have called the onClean cb yet');
      wrapper.instance().input.value = '';
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean cb');
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({ ...wrapper.context(), muiFormControl });
    }

    beforeEach(() => {
      wrapper = shallow(<Input />);
    });

    it('should have the formControl class', () => {
      setFormControlContext({});
      assert.strictEqual(wrapper.hasClass(classes.formControl), true);
    });

    describe('callbacks', () => {
      let handleDirty;
      let handleClean;

      beforeEach(() => {
        handleDirty = spy();
        handleClean = spy();
        // Mock the input ref
        wrapper.setProps({ onDirty: handleDirty, onClean: handleClean });
        wrapper.instance().input = { value: '' };
        setFormControlContext({ onDirty: spy(), onClean: spy() });
      });

      it('should fire the onDirty muiFormControl and props callback when dirtied', () => {
        wrapper.instance().input.value = 'hello';
        wrapper.find('input').simulate('change');
        assert.strictEqual(handleDirty.callCount, 1, 'should have called the onDirty props cb');
        assert.strictEqual(
          muiFormControl.onDirty.callCount,
          1,
          'should have called the onDirty muiFormControl cb',
        );
      });

      it('should fire the onClean muiFormControl and props callback when cleaned', () => {
        wrapper.instance().input.value = '';
        wrapper.find('input').simulate('change');
        assert.strictEqual(handleClean.callCount, 1, 'should have called the onClean props cb');
        assert.strictEqual(
          muiFormControl.onClean.callCount,
          1,
          'should have called the onClean muiFormControl cb',
        );
      });
    });

    describe('error', () => {
      beforeEach(() => {
        setFormControlContext({ error: true });
      });

      it('should have the error class', () => {
        assert.strictEqual(wrapper.hasClass(classes.error), true);
      });

      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.hasClass(classes.error), true);
        wrapper.setProps({ error: false });
        assert.strictEqual(wrapper.hasClass(classes.error), false);
        wrapper.setProps({ error: true });
        assert.strictEqual(wrapper.hasClass(classes.error), true);
      });
    });

    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({ margin: 'dense' });
        });

        it('should have the inputDense class', () => {
          assert.strictEqual(wrapper.find('input').hasClass(classes.inputDense), true);
        });
      });

      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.find('input').hasClass(classes.inputDense), false);
        wrapper.setProps({ margin: 'dense' });
        assert.strictEqual(wrapper.find('input').hasClass(classes.inputDense), true);
      });
    });

    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        setFormControlContext({ required: true });
        const input = wrapper.find('input');
        assert.strictEqual(input.props().required, true);
      });
    });
  });

  describe('componentDidMount', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = mount(<NakedInput classes={classes} />);
      instance = wrapper.instance();
    });

    beforeEach(() => {
      instance.checkDirty = spy();
    });

    it('should not call checkDirty if controlled', () => {
      instance.isControlled = () => true;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 0);
    });

    it('should call checkDirty if controlled', () => {
      instance.isControlled = () => false;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 1);
    });

    it('should call checkDirty with input value', () => {
      instance.isControlled = () => false;
      instance.input = 'woofinput';
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.calledWith(instance.input), true);
    });

    it('should call or not call checkDirty consistently', () => {
      instance.isControlled = () => true;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 0);
      instance.isControlled = () => false;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 1);
      instance.isControlled = () => true;
      instance.componentDidMount();
      assert.strictEqual(instance.checkDirty.callCount, 1);
    });
  });

  describe('mount', () => {
    it('should be able to access the native input', () => {
      const handleRef = spy();
      mount(<Input inputRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });

    it('should be able to access the native textarea', () => {
      const handleRef = spy();
      mount(<Input multiline inputRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });

  describe('hasValue', () => {
    ['', 0].forEach(value => {
      it(`is true for ${value}`, () => {
        assert.strictEqual(hasValue(value), true);
      });
    });

    [null, undefined].forEach(value => {
      it(`is false for ${value}`, () => {
        assert.strictEqual(hasValue(value), false);
      });
    });
  });

  describe('isDirty', () => {
    [' ', 0].forEach(value => {
      it(`is true for value ${value}`, () => {
        assert.strictEqual(isDirty({ value }), true);
      });

      it(`is true for SSR defaultValue ${value}`, () => {
        assert.strictEqual(isDirty({ defaultValue: value }, true), true);
      });
    });
    [null, undefined, ''].forEach(value => {
      it(`is false for value ${value}`, () => {
        assert.strictEqual(isDirty({ value }), false);
      });

      it(`is false for SSR defaultValue ${value}`, () => {
        assert.strictEqual(isDirty({ defaultValue: value }, true), false);
      });
    });
  });

  describe('prop: inputProps', () => {
    it('should apply the props on the input', () => {
      const wrapper = shallow(<Input inputProps={{ className: 'foo', readOnly: true }} />);
      const input = wrapper.find('input');
      assert.strictEqual(input.hasClass('foo'), true, 'should have the foo class');
      assert.strictEqual(input.hasClass(classes.input), true, 'should still have the input class');
      assert.strictEqual(input.props().readOnly, true, 'should have the readOnly prop');
    });

    it('should be able to get a ref', () => {
      const handleRef = spy();
      mount(<Input inputProps={{ ref: handleRef }} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });

  describe('prop: startAdornment, prop: endAdornment', () => {
    it('should render adornment before input', () => {
      const wrapper = shallow(
        <Input startAdornment={<InputAdornment position="start">$</InputAdornment>} />,
      );

      assert.strictEqual(wrapper.childAt(0).type(), InputAdornment);
    });

    it('should render adornment after input', () => {
      const wrapper = shallow(
        <Input endAdornment={<InputAdornment position="end">$</InputAdornment>} />,
      );

      assert.strictEqual(wrapper.childAt(1).type(), InputAdornment);
    });
  });
});
