import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

// to run the test : $env:CI=$true; npm test -- --coverage

test('5.13: render only the title and the author by default', () => {
  const blog = {
    title :'Uchiha clan',
    url : '1-testing.com',
    likes : 7,
    author : 'Madara Uchiha'
  }

  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.defaultBlog')
  const div2 = container.querySelector('.fullBlog')

  expect(div).toBeDefined()
  expect(div).not.toHaveTextContent('1-testing.com')
  expect(div2).toBe(null)
})


test('5.14: render the full blog', async () => {
  const blog = {
    title :'Village Hidden in the Leaves',
    url : '2-testing.com',
    likes : 8,
    author : 'Minato Namikaze',
    user : {
      id: '5a43e6b6c37f3d065eaaa581',
      username: 'Ahmed_yns',
      name: 'Ahmed Younsi'
    }
  }

  const { container } = render(<Blog blog={blog}/>)
  const button = screen.getByText('view')
  fireEvent.click(button)

  const div = container.querySelector('.fullBlog')

  expect(div).toBeDefined()
  expect(div).toHaveTextContent('2-testing.com')
  expect(div).toHaveTextContent('8')
})


test('5.15: if the like button is clicked twice', () => {
  const blog = {
    title :'Village Hidden by Sand',
    url : '3-testing.com',
    likes : 8,
    author : 'Gaara Yuzawa',
    user : {
      id: '5a43e6b6c37f3d065eaaa581',
      username: 'Ahmed_yns',
      name: 'Ahmed Younsi'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateBlog={mockHandler}/>)
  const button = screen.getByText('view')
  fireEvent.click(button)

  const button2 = screen.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)
  // fireEvent.dblClick(button2) didn't work for me

  expect(mockHandler).toHaveBeenCalledTimes(2)
})


test('5.16: test the blog form', async () => {
  const mockHandler = jest.fn()
  render(<BlogForm addBlog={mockHandler}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  fireEvent.change(titleInput, { target: { value:'the Hidden Mist Village' } })
  fireEvent.change(authorInput, { target: { value:'Kisame Hoshigaki' } })
  fireEvent.change(urlInput, { target: { value:'4-testing.com' } })

  const sendButton = screen.getByText('create')
  fireEvent.click(sendButton)

  const blog = {
    title :'the Hidden Mist Village',
    url : '4-testing.com',
    author : 'Kisame Hoshigaki',
  }
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual(blog)
})
