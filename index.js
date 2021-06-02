const { app, BrowserWindow, dialog, Menu, MenuItem, Notification, Tray }  = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    // transparent: true // 透明边框
    // webPreferences: { // 开启网页功能设置
    //   nodeIntegration: true
    // },
    // resizable: false,
    backgroundColor: '#00c297', // 背景颜色
    opacity: 0.8, // 窗体透明度 0~1
    icon: './icon.png' // 应用图标
    // frame: false // 设置无边框窗口（无工具栏、边框、其它图形化外壳）
  })

  // 创建应用图标
  const appIcon = new Tray('./icon.png')

  // 设置无工具栏
  Menu.setApplicationMenu(null)

  // win.loadFile('./build/index.html')
  win.loadFile('index.html')

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', { text: 'This is a text.'})
  })

  win.webContents.on('mineclick', () => {
    console.log('Click MEssage received.!');
  })
}

// notification
function showNotification () {
  const notification = {
    title: 'basic notification',
    body: 'This is a notification.'
  }
  new Notification(notification).show()
}

app.whenReady().then(() => {
  console.log('start createWindow...')
  createWindow()
}).then(() => {
  console.log('start showNotification...')
  // showNotification()

  // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
  // dialog.showMessageBoxSync({ 
  //   title: '测试弹窗',
  //   message: '这是message',
  //   buttonLabel: '确认label'
  // })
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// // 快捷键
// const menu = new Menu()
// menu.append(new MenuItem({
//   label: 'Electron',
//   submenu: [{
//     role: 'help',
//     accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
//     click: async () => { 
//       console.log('Electron rocks!')
      
//       // 选择文件夹
//       const res = await dialog.showOpenDialog({
//         properties: ['openDirectory']
//       })
//       console.log('choose Dir', res, ' \nAddress:', !res.canceled && res.filePaths[0])
//     }
//   }]
// }))
// Menu.setApplicationMenu(menu)

function test () {
  console.log('test');
}

exports.test = test
