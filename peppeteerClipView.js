let puppeteer = require('puppeteer');
(async () =>{
  var  screenshotDOMElement = async (page, selector, path, padding = 0) => {
    const rect = await page.evaluate(selector => {
        try{
            const element = document.querySelector(selector);
            // console.log(element)
            const {x, y, width, height} = element.getBoundingClientRect();
            if(width * height != 0){
              return {left: x, top: y, width, height, id: element.id};
            }else{
              return null;
            }
        }catch(e){
          return null;
        }
    }, selector);
    return await page.screenshot({
        path: path,
        clip: rect ? {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
        } : null
    });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({width: 337, height: 667, deviceScaleFactor: 2});
                // ！访问的地址
  await page.goto('http://0.0.0.0:8000/index.html')
                                                  // ！修改文件名称
  await screenshotDOMElement(page,".pictureTips", './img/t_c798c4929c8c41c7a2690b7f2cf78242.png');
  await browser.close();
})()
