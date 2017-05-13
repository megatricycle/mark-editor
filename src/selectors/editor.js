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

export const getSelectedObject = createSelector(
    [editor => editor.objects, editor => editor.selectedObject],
    (objects, selectedObject) => {
        if (!selectedObject) {
            return null;
        }

        for (let i = 0; i < objects.length; i++) {
            for (let j = 0; j < objects[i].length; j++) {
                if (objects[i][j].id === selectedObject) {
                    return objects[i][j];
                }
            }
        }

        return null;
    }
);
