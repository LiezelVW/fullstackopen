type CoursePart = {
  id: number
  name: string
  exercises: number
}

type CourseData = {
  id: number
  name: string
  parts: CoursePart[]
}

const Header = ({ name }: { name: string }) => <h1>{name}</h1>

const Part = ({ part }: { part: CoursePart }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>total of {total} exercises</strong></p>
}

const Course = ({ course }: { course: CourseData }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      { id: 1, name: 'Fundamentals of React', exercises: 10 },
      { id: 2, name: 'Using props to pass data', exercises: 7 },
      { id: 3, name: 'State of a component', exercises: 14 },
    ],
  }

  return <Course course={course} />
}

export default App
