type CoursePart = {
  name: string;
  exercises: number;
};

type PartsProps = {
  parts: CoursePart[];
};

const Header = (props: { course: string }) => {
  return <h1>{props.course}</h1>;
};

const Part = (props: CoursePart) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props: PartsProps) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props: PartsProps) => {
  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return <p>Number of exercises: {totalExercises}</p>;
};

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
}

export default App;
