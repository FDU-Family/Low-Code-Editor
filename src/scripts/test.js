export function log1() {
  console.log(1)
}

export function changeText() {
  this.content = '123changed'
}

export function changeStyle() {
  this.props.style.margin = '10px'
  this.props.style.color = 'red'
}

export function addClass() {
  this.props.class.push('m-10px')
}
