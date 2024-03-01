interface onConstructionProps {
  page: string;
}

const OnConstruction = ({page}:onConstructionProps):React.JSX.Element => {
  return (
    <h1>{page} On Construction</h1>
  )
}

export default OnConstruction;