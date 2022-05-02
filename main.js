const { app, BrowserWindow } = require('electron')

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  await win.loadFile('index.html')

  return win;
}

const createChild = async (parent) => {
  const win = new BrowserWindow({
    parent,
    width: 800,
    height: 600,
    modal: true,
    useContentSize: true,
    webPreferences: {
      enablePreferredSizeMode: true,
    },
  });

  win.webContents.on('preferred-size-changed', (_event, { width, height }) => {
    win.setContentSize(width, height);
  });

  await win.loadFile('child.html')
}

app.whenReady().then(async () => {
  const parent = await createWindow()
  createChild(parent);
})
