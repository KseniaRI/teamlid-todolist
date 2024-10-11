import React from 'react';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import Form, { Field, FormFooter } from '@atlaskit/form';

const SelectProjectForm = ({ projects }) => {
    const projectsOptions =
        projects.map(({ key, name }) => {
            return {
                label: name,
                value: key,
            };
        }) || [];

    return (
        <div style={{ padding: '60px', width: '400px' }}>
            <Form
                onSubmit={async data => {
                    console.log('form data', data);
                    if (data.projectKey) {
                        console.log(data.projectKey);
                        try {
                            AP.navigator.go('addonmodule', {
                                moduleKey: 'todolist-tasks',
                                customData: {
                                    projectKey: data.projectKey.value,
                                },
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }}
            >
                {({ formProps }) => (
                    <form {...formProps}>
                        <Field
                            name="projectKey"
                            defaultValue=""
                            label="Select a project"
                        >
                            {({ fieldProps: { id, ...rest } }) => (
                                <Select
                                    inputId={id}
                                    {...rest}
                                    options={projectsOptions}
                                    isClearable
                                />
                            )}
                        </Field>
                        <FormFooter>
                            <Button type="submit" appearance="primary">
                                Submit
                            </Button>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </div>
    );
};
export default SelectProjectForm;
