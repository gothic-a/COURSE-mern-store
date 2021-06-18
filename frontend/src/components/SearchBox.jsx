import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')

    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } 
    }

    return (
        <Form 
            onSubmit={submitHandler} 
            inline 
            style={{display: 'flex'}}
            className='mr-sm-2 ml-sm-5 my-2'    
        >
            <Form.Control
                type='text'
                name='search'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search...'
                className='p-3 mr-5'
            > 
            </Form.Control>
            <Button 
                type='submit' 
                variant='outline-success' 
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox