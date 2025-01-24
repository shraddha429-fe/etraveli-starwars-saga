interface Props {
    rating: number;
    maxValue?: number; 
}

const StarRating = (props: Props) => {
    const {rating, maxValue=10} = props;

    return (
        <div className="rating-container">
            {[...Array(maxValue)].map((_, index) => {
                return (
                    <span 
                        className={`icon-star ${index }`}
                    />
                )
            })}
        </div>
    )
};

export default StarRating;