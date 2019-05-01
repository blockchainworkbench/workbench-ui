import { getSHA256 } from '../../../lib/helpers'

/**
 * @return {null}
 */
export default function ScriptElement(props) {
  handleScriptContent(props.content)
  handleScriptSrc(props.element.src)
  return null
}

function getElementByHash(value) {
  const scriptContentHash = getSHA256(value)
  const doesAlreadyExist = document.getElementById(scriptContentHash)
  return { hash: scriptContentHash, exists: doesAlreadyExist }
}

function handleScriptContent(content) {
  if (!content) return
  content.forEach(itm => {
    if (itm === '') return
    const element = getElementByHash(itm)
    if (element.exists) return
    const script = document.createElement('script')
    script.id = element.hash
    script.innerHTML = itm
    document.body.appendChild(script)
  })
}

function handleScriptSrc(src) {
  if (!src) return
  const element = getElementByHash(src)
  if (element.exists) return
  const script = document.createElement('script')
  script.id = element.hash
  let srcWithRelativePathCheck = src
  if (!src.startsWith('http')) {
    srcWithRelativePathCheck = `${process.env.REACT_APP_JSONFEED_BASE}${src}`
  }
  script.src = srcWithRelativePathCheck
  document.body.appendChild(script)
}
