
import './style.css'
import { getPalette } from 'colorthief'

document.querySelector('#app').innerHTML = `
  <main class="app">
    <header>
      <h1>Color Palette Extractor</h1>
      <p>Discover the dominant colors in your image.</p>
    </header>

    <section class="upload-section">
      <label for="image-input">Choose an image</label>
      <input id="image-input" type="file" accept="image/*">
    </section>

    <section id="preview-section" hidden>
      <h2>Selected Image</h2>
      <img id="preview-image" alt="Selected image preview">

      <h2>Color Palette</h2>
      <div id="palette"></div>
    </section>
  </main>
`

const imageInput = document.querySelector('#image-input')
const previewSection = document.querySelector('#preview-section')
const previewImage = document.querySelector('#preview-image')
const paletteContainer = document.querySelector('#palette')

imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0]
  if (!file) return

  previewImage.src = URL.createObjectURL(file)
  previewSection.hidden = false
  paletteContainer.textContent = 'Extracting colors...'

  try {
    await previewImage.decode()

    const colors = await getPalette(previewImage, {
      colorCount: 6
    })

    paletteContainer.innerHTML = colors.map(color => {
      const hex = color.hex()

      return `
        <div class="color-item">
          <div class="color-swatch"
               style="background-color: ${hex}"></div>
          <p>${hex}</p>
        </div>
      `
    }).join('')
  } catch (error) {
    console.error(error)
    paletteContainer.textContent =
      'Failed to extract colors. Check the browser console.'
  }
})
