export const getConnerColor = (id, color, type = 0) => {
    if (type === 0) {
        $('.input' + id).siblings('.yq-form__arrow')
            .children('.yq-form__arrow--arrowSpan').css({
                'border-color': color
            })
    } else if (type === 1) {
        $('.input' + id).parents().siblings('.yq-form__arrow')
            .children('.yq-form__arrow--arrowSpan').css({
                'border-color': color
            })
    }
}

