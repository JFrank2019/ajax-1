console.log('我是 main.js')

// 简单封转ajax
let ajax = (method, path, fn) => {
  const request = new XMLHttpRequest()
  request.open(method, path)
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        fn(request)
      } else {
        alert(`请求${path}失败`)
      }
    }
  }
  request.send()
}

getCSS.onclick = () => {
  ajax('GET', '/style.css', request => {
    // 创建 style 标签
    const style = document.createElement('style')
    // 填写 style 内容
    style.innerHTML = request.response
    // 插到头里面
    document.head.appendChild(style)
  })
}

getJS.onclick = () => {
  ajax('GET', '/2.js', request => {
    // 创建 script 标签
    const script = document.createElement('script')
    // 设置内容
    script.innerHTML = request.response
    // 添加到 body 中
    document.body.appendChild(script)
  })
}

getHTML.onclick = () => {
  ajax('GET', '/3.html', request => {
    htmlContent.innerHTML = request.response
  })
}

getXML.onclick = () => {
  ajax('GET', '/4.xml', request => {
    let dom = request.responseXML
    let content = dom.getElementsByTagName('warning')[0].innerHTML
    console.log(content.trim())
  })
}

getJSON.onclick = () => {
  ajax('GET', '/5.json', request => {
    let object
    try {
      object = JSON.parse(request.response)
    } catch (error) {
      console.log('JSON转化出错了', error)
      object = {}
    }
    console.log(object)
  })
}

let pageNum = 1

getPage.onclick = () => {
  if (pageNum > 3) {
    alert('暂无新数据')
    return
  }
  ajax('GET', `/page${pageNum}`, request => {
    let array = JSON.parse(request.response)
    array.forEach(item => {
      const li = document.createElement('li')
      li.textContent = item.id
      xxx.appendChild(li)
    })
    pageNum += 1
  })
}
