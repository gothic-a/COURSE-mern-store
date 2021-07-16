import { useMemo } from 'react'
import PropTypes from 'prop-types'

const Rating = ({value, text, color}) => {
    
    const renderStars = () => {
        let temp = value
        const stars = []

        for(let i = 1; i <= 5; i++) {
            const star = (
                <span key={i}>
                    <i  style={{color}}
                        className={ 
                            temp >= 1 
                            ? 'fas fa-star' 
                            : temp >= 0.5 
                            ? 'fas fa-star-half-alt' 
                            : 'far fa-star' }></i>
                </span>
            )
            stars.push(star)

            temp -= 1
        }

        return stars
    }

    const stars = useMemo(renderStars, [value, color])

    return (
        <div className="rating ">
            {
                stars
            }
            <span className="p-2">
                { text && text }
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Rating