import calculate from './calculate'

it('returns a positive number', () => {
  expect(calculate('1=')).toEqual(1)
})

it('returns a negative number', () => {
  expect(calculate('-1=')).toEqual(-1)
})

it('adds two numbers', () => {
  expect(calculate('1+2=')).toEqual(3)
})

it('subtracts two numbers', () => {
  expect(calculate('3-2=')).toEqual(1)
})

it('multiplies two numbers', () => {
  expect(calculate('1*2=')).toEqual(2)
})

it('divides two numbers', () => {
  expect(calculate('4/2=')).toEqual(2)
})

it('follows algebraic operator precedence', () => {
  expect(calculate('2+2*2-2/2=')).toEqual(5)
})

it('throws on divide by zero', () => {
  expect(() => {
    calculate('1/0=')
  }).toThrowError(new Error('divide by zero'))
})

it('throws on invalid primary', () => {
  expect(() => {
    calculate('x=')
  }).toThrowError(new Error('primary expected'))
})

it('throws on bad symbols', () => {
  expect(() => {
    calculate('2?2=')
  }).toThrowError(new Error('expression error'))
})
