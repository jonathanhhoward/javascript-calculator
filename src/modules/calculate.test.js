import calculate from './calculate'

test('returns a positive number', () => {
  expect(calculate('1=')).toEqual(1)
})

test('returns a negative number', () => {
  expect(calculate('-1=')).toEqual(-1)
})

test('adds two numbers', () => {
  expect(calculate('1+2=')).toEqual(3)
})

test('subtracts two numbers', () => {
  expect(calculate('3-2=')).toEqual(1)
})

test('multiplies two numbers', () => {
  expect(calculate('1*2=')).toEqual(2)
})

test('divides two numbers', () => {
  expect(calculate('4/2=')).toEqual(2)
})

test('follows algebraic operator precedence', () => {
  expect(calculate('2+2*2-2/2=')).toEqual(5)
})

test('throws on divide by zero', () => {
  expect(() => {
    calculate('1/0=')
  }).toThrowError(new Error('divide by zero'))
})

test('throws on invalid primary', () => {
  expect(() => {
    calculate('x=')
  }).toThrowError(new Error('primary expected'))
})

test('throws on bad symbols', () => {
  expect(() => {
    calculate('2?2=')
  }).toThrowError(new Error('expression error'))
})
