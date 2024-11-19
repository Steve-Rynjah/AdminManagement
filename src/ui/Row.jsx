import styled, { css } from "styled-components";


const Row = styled.div`
    display: flex;
    ${(props) => props.type === "horizontal" && css`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `}

    ${(props) => props.type === "vertical" && css`
        flex-direction: column;
        gap: 1.6rem;
    `}
`

//To display the default type, such that we don't have to always mention the type if it's vertical
Row.defaultProps = {
    type: "vertical"
}

export default Row;