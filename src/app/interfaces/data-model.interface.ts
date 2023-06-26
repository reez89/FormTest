export interface DataModelInterface {
  id: string
  title: string
  fields: Field[]
}

export interface Field {
  name: string
  type: string | number
  required: boolean
}
