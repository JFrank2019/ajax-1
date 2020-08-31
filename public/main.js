console.log('我是 main.js')

getCSS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css')
  request.onreadystatechange = () => {
    console.log(request.readyState)
    // 下载完成，单不知道是成功 2xx 还是失败 4xx 5xx
    if (request.readyState === 4) {
      console.log('下载完成')
      if (request.status >= 200 && request.status < 300) {
        // 创建 style 标签
        const style = document.createElement('style')
        // 填写 style 内容
        style.innerHTML = request.response
        // 插到头里面
        document.head.appendChild(style)
      } else {
        alert('加载 CSS 失败')
      }
    }
  }
  request.send()
}

getJS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/2.js')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // 创建 script 标签
        const script = document.createElement('script')
        // 设置内容
        script.innerHTML = request.response
        // 添加到 body 中
        document.body.appendChild(script)
      } else {
        alert('加载 JS 失败')
      }
    }
  }
  request.send()
}

getHTML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/3.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        htmlContent.innerHTML = request.response
      } else {
        alert('加载 HTML 失败')
      }
    }
  }
  request.send()
}

getXML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/4.xml')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        let dom = request.responseXML
        let content = dom.getElementsByTagName('warning')[0].innerHTML
        console.log(content.trim())
      } else {
        alert('加载 XML 失败')
      }
    }
  }
  request.send()
}

getJSON.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/5.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        let object
        try {
          object = JSON.parse(request.response)
        } catch (error) {
          console.log('JSON转化出错了', error)
          object = {}
        }
        console.log(object)
      }
    }
  }
  request.send()
}

let pageNum = 1

getPage.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', `/page${pageNum}`)
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        let array = JSON.parse(request.response)
        array.forEach(item => {
          const li = document.createElement('li')
          li.textContent = item.id
          xxx.appendChild(li)
        })
        pageNum += 1
      }
    }
  }
  request.send()
}
