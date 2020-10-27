import React from 'react';

const Course = ({ course }) => {
  return (
    course.map(course => {
      return(
        <div key={course.id}>
          <Header course={course}/>
          <Content course={course}/>
          <Total course={course}/>
        </div>
      )  
    })
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>  <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises,0)
  return(
    <p><b>total of {total} exercises</b></p>
  ) 
}


export default Course