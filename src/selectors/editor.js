import { createSelector } from 'reselect';

export const getCurrentStep = createSelector(
    [editor => editor.steps, editor => editor.currentStepIndex],
    (steps, currentStepIndex) => {
        return steps[currentStepIndex];
    }
);

export const getCurrentObjects = createSelector(
    [editor => editor.objects, editor => editor.currentStepIndex],
    (objects, currentStepIndex) => {
        return objects[currentStepIndex];
    }
);

export const getCurrentImageTarget = createSelector(
    [editor => editor.imageTargets, editor => editor.currentStepIndex],
    (imageTargets, currentStepIndex) => {
        return imageTargets[currentStepIndex];
    }
);
