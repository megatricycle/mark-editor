import { createSelector } from 'reselect';

export const getCurrentStep = createSelector(
    [editor => editor.steps, editor => editor.currentStepIndex],
    (steps, currentStepIndex) => {
        return steps[currentStepIndex];
    }
);
