import genericReducer from '../../src/reducers/genericReducer';

describe('genericReducer', () => {
  let sandbox;
  let functionSpy;
  let functionMap;
  let state;
  let action;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    functionSpy = sandbox.spy();
    functionMap = {
      "foo": functionSpy
    }
    state = {
      "key": "value"
    }
    action = {
      type: "foo"
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call the mapped method', () => {
    genericReducer(functionMap, state, action);
    expect(functionSpy).to.be.calledOnce;
    expect(functionSpy.firstCall.args).to.eql([state, action]);
  });

  it('should return default state', () => {
      expect(genericReducer(functionMap, state, {type: "bar"}))
        .to.eql(state);
  });
});
