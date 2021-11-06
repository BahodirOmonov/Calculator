const input = document.querySelector('input')

const num1 = document.querySelector('.num1')
const num2 = document.querySelector('.num2')
const num3 = document.querySelector('.num3')
const num4 = document.querySelector('.num4')
const num5 = document.querySelector('.num5')
const num6 = document.querySelector('.num6')
const num7 = document.querySelector('.num7')
const num8 = document.querySelector('.num8')
const num9 = document.querySelector('.num9')
const num0 = document.querySelector('.num0')

const equal = document.querySelector('.equal')
const add = document.querySelector('.add')
const sub = document.querySelector('.sub')
const mul = document.querySelector('.mul')
const div = document.querySelector('.div')
const dot = document.querySelector('.dot')
const remove_R = document.querySelector('.remove-R')
const remove_C = document.querySelector('.remove-C')

let display = ""
let sign = ""

class Calculator {
	checkSign(value) {
		this.checkEqual()
		if (display[display.length - 1] !== value && ('+-x÷').includes(display[display.length - 1]))
			return display.slice(0, -1) + value
		else if(sign && display[0] !== sign)
			return display
		else if((value !== display[display.length - 1] && display !== ""))
			return display + value
		else 
			return display
	
	}
	
	checkEqual() {
		if(display.slice(1).includes('+')) sign = '+'
		else if(display.slice(1).includes('x')) sign = 'x'
		else if(display.slice(1).includes('÷')) sign = '÷'
		else if(display.slice(1).includes('-')) sign = '-'
		else sign = ""
	}
	
	checkZero(value) {
		if(display === "0"){
			return value
		}
		else if(('+-x÷').includes(display[display.length - 2]) && display[display.length - 1] === '0')
			return display.slice(0, -1) + value
		else
			return display + value
		
	}

	dotCheck() {
		this.checkEqual()
		if(!display.includes('.') && display !== "")
			display += dot.textContent
		else if(sign && !display.slice(display.indexOf(sign, 1)).includes('.'))
			if(display[display.indexOf(sign, 1) + 1] === undefined)
				display += '0' + dot.textContent
			else
				display += dot.textContent
		this.result(display)
	}

	equalCalculate() {
		this.checkEqual()
		let checkUndefined = display[display.indexOf(sign, 1) + 1] != undefined
		if(sign === '+' && checkUndefined)
			display = display.split('+').reduce((sum, el) => ((parseFloat(sum) * 10) + (parseFloat(el) * 10)) / 10).toString()
		else if(sign === '-' && checkUndefined)
			if(display[0] === '-')
				display = (display.slice(0, display.indexOf('-', 1)) - display.slice(display.indexOf('-', 1) + 1)).toString()
			else
				display = display.split('-').reduce((sum, el) => ((parseFloat(sum) * 10) - (parseFloat(el) * 10)) / 10).toString()
		else if(sign === 'x' && checkUndefined)
			display = display.split('x').reduce((sum, el) => ((parseFloat(sum) * 10) * (parseFloat(el) * 10) / 100)).toString()
		else if(sign === '÷' && checkUndefined)
			display = display.split('÷').reduce((sum, el) => (parseFloat(sum) * 10) / (parseFloat(el) * 10)).toString()
		this.result(display)
	}
	
	result(value) {
		input.setAttribute('value', value)
		this.checkEqual()
	}

}


let calc = new Calculator() 

	
num1.addEventListener('click', (event) => {
	display = calc.checkZero(num1.textContent)
	calc.result(display)
})

num2.addEventListener('click', (event) => {
	display = calc.checkZero(num2.textContent)
	calc.result(display)
})

num3.addEventListener('click', (event) => {
	display = calc.checkZero(num3.textContent)
	calc.result(display)
})

num4.addEventListener('click', (event) => {
	display = calc.checkZero(num4.textContent)
	calc.result(display)
})

num5.addEventListener('click', (event) => {
	display = calc.checkZero(num5.textContent)
	calc.result(display)
})

num6.addEventListener('click', (event) => {
	display = calc.checkZero(num6.textContent)
	calc.result(display)
})

num7.addEventListener('click', (event) => {
	display = calc.checkZero(num7.textContent)
	calc.result(display)
})

num8.addEventListener('click', (event) => {
	display = calc.checkZero(num8.textContent)
	calc.result(display)
})

num9.addEventListener('click', (event) => {
	display = calc.checkZero(num9.textContent)
	calc.result(display)
})

num0.addEventListener('click', (event) => {
	calc.checkEqual()
	if(display !== '0' && (display.slice(display.indexOf(sign, 1) + 1) !== '0' || sign == ""))
		display += num0.textContent
	calc.result(display)
})

dot.addEventListener('click', (event) => calc.dotCheck())

add.addEventListener('click', (event) => {
		display = calc.checkSign(add.textContent)
		calc.result(display)
})

sub.addEventListener('click', (event) => {
	display = calc.checkSign(sub.textContent)
	calc.result(display)
})

mul.addEventListener('click', (event) => {
	display = calc.checkSign(mul.textContent)
	calc.result(display)
})

div.addEventListener('click', (event) => {
	display = calc.checkSign(div.textContent)
	calc.result(display)
})

remove_R.addEventListener('click', (event) => {
	display = display.slice(0, -1)
	calc.result(display)
})

remove_C.addEventListener('click', (event) => {
	display = ""
	calc.result(display)
})

equal.addEventListener('click', (event) => calc.equalCalculate())
