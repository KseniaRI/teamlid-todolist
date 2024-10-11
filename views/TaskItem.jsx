import React, { useState } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import Button from '@atlaskit/button';

const TaskItem = ({ task, filtered, onRemoveTask }) => {
    const [isChecked, setIsChecked] = useState(false);
    const onChange = () => {
        setIsChecked(current => !current);
    };

    return (
        <li
            style={{
                order: isChecked ? 1 : 0,
                display: filtered && !isChecked ? 'none' : 'flex',
                gap: '50px',
                alignItems: 'center',
            }}
        >
            <Button appearance="subtle" onClick={() => onRemoveTask(task)}>
                <EditorRemoveIcon size="medium" label="" />
            </Button>
            <Checkbox
                isChecked={isChecked}
                onChange={onChange}
                label={isChecked ? 'Done' : 'Not done'}
            />
            <span>{task.priority}</span>
            <span style={{ color: isChecked ? 'green' : 'black' }}>
                {task.summary}
            </span>
        </li>
    );
};

export default TaskItem;
