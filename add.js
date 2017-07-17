import createMathOperation from './internal/createMathOperation.js'

const add = createMathOperation((aguend, addend) => arguend + addend, 0)

export default add