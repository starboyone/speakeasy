import { Edit, SimpleForm, TextInput, required } from "react-admin"

export const CourseEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" validate={[required()]} label="Id"/>
                <TextInput source="title" validate={[required()]} label="Название"/>
                <TextInput source="imgSrc" validate={[required()]} label="Изображение"/>
            </SimpleForm>
        </Edit>
    )
}