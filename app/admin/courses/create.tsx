import { Create, SimpleForm, TextInput, required } from "react-admin"

export const CourseCreate = () => {
    return (
        <Create className="p-10 lg:flex lg:items-center lg:justify-center">
            <SimpleForm className="m-4 flex items-center justify-center mx-4">
                <p className="font-bold text-xl py-2">Создать курс</p>
                <TextInput source="title" validate={[required()]} label="Название"/>
                <TextInput source="imgSrc" validate={[required()]} label="Изображение"/>
            </SimpleForm>
        </Create>
    )
}