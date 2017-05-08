import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setProductName: ['productName'],
    addStep: null,
    setStepIndex: ['i'],
    setStepInstruction: ['i', 'instruction']
});

export const EditorTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    steps: [
        {
            instruction: ''
        }
    ],
    currentStepIndex: 0,
    productName: null,
    imageTarget: null,
    objects: []
});

/* ------------- Reducers ------------- */

export const setProductName = (state, { productName }) =>
    state.merge({ productName });

export const addStep = state =>
    state.merge({
        steps: [
            ...state.steps,
            {
                instruction: ''
            }
        ],
        currentStepIndex: state.steps.length
    });

export const setStepIndex = (state, { i }) =>
    state.merge({ currentStepIndex: i });

export const setStepInstruction = (state, { i, instruction }) =>
    state.merge({
        steps: state.steps.map((step, j) => {
            if (i === j) {
                return { ...step, instruction };
            }

            return step;
        })
    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_PRODUCT_NAME]: setProductName,
    [Types.ADD_STEP]: addStep,
    [Types.SET_STEP_INDEX]: setStepIndex,
    [Types.SET_STEP_INSTRUCTION]: setStepInstruction
});
