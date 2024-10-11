import React, { useState } from 'react';
import TaskItem from './TaskItem';
import Button from '@atlaskit/button';
import Heading from '@atlaskit/heading';

const TodoList = ({ tasks }) => {
    const [filtered, setFiltered] = useState(false);
    const [remainingTasks, setRemainingTasks] = useState(tasks);

    const onFilterBtnClick = () => {
        setFiltered(current => !current);
    };
    const onRemoveTask = taskToRemove => {
        setRemainingTasks(currentTasks =>
            currentTasks.filter(task => task.key !== taskToRemove.key),
        );
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                padding: '60px',
            }}
        >
            <Heading size="xlarge">Todo list tasks</Heading>
            <div style={{ width: '200px' }}>
                <Button appearance="primary" onClick={onFilterBtnClick}>
                    {filtered ? 'Show all tasks' : 'Show complete tasks'}
                </Button>
            </div>
            <ul
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: 0,
                }}
            >
                {remainingTasks.map(task => (
                    <TaskItem
                        task={task}
                        key={task.key}
                        filtered={filtered}
                        onRemoveTask={onRemoveTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
