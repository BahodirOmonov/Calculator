const input = document.querySelector('input')

const nums = document.querySelectorAll('.num')
const num0 = document.querySelector('.num0')

const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
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

for (let num of nums) {
	num.addEventListener('click', (event) => {
		display = calc.checkZero(num.textContent)
		calc.result(display)
	})
}


num0.addEventListener('click', (event) => {
	calc.checkEqual()
	if(display !== '0' && (display.slice(display.indexOf(sign, 1) + 1) !== '0' || sign == ""))
		display += num0.textContent
	calc.result(display)
})

dot.addEventListener('click', (event) => calc.dotCheck())

for(let operation of operations) {
	operation.addEventListener('click', (event) => {
		display = calc.checkSign(operation.textContent)
		calc.result(display)
	})
}

remove_R.addEventListener('click', (event) => {
	display = display.slice(0, -1)
	calc.result(display)
})

remove_C.addEventListener('click', (event) => {
	display = ""
	calc.result(display)
})

equal.addEventListener('click', (event) => calc.equalCalculate())
