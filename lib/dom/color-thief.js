class CanvasImage {
	constructor (image) {
		const defaultWidth = 100
		const defaultHeight = 100
		this.canvas = document.createElement('canvas')
		this.context = this.canvas.getContext('2d')
		this.width = this.canvas.width = (image.width || defaultWidth)
		this.height = this.canvas.height = (image.height || defaultHeight)
		this.context.drawImage(image, 0, 0, this.width, this.height)
	}

	render () {
		//
	}
	clear () {
		this.context.clearRect(0, 0, this.width, this.height)
	}

	update (imageData) {
		this.context.putImageData(imageData, 0, 0)
	}

	getPixelCount () {
		return this.width * this.height
	}

	getImageData () {
		return this.context.getImageData(0, 0, this.width, this.height)
	}

	removeCanvas () {
		this.canvas.parentNode.removeChild(this.canvas)
	}
}

class ColorThief {

	getColor (socurceImage, quailty) {
		const palette = this.getPalette(socurceImage, 5, quailty)
		const dominantColor = palette[0]
		return dominantColor
	}

	getPalette (sourceImage, colorCount = 5, quality = 10) {
		if (!sourceImage) {
			Error('your target must be image')
		}
		const image = new CanvasImage(sourceImage)
		const imageData = image.getImageData()
		const pixels = imageData.data
		const pixelCount = image.getPixelCount()

		const pixelArray = []
		pixelCount.forEach((v, i) => {
			let offset = i * 4
			r = pixels[offset + 0]
			g = pixels[offset + 1]
			b = pixels[offset + 2]
			a = pixels[offset + 3]
			// If pixel is mostly opaque and not white
			if (a > 125) {
				if (!(r > 250 && g > 250 && b > 250)) {
					pixelArray.push([r, g, b])
				}
			}
		})

		const cmap = MMCQ.quantize(pixelArray, colorCount)
		const paletee = cmap ? cmap.palette() : null
		image.removeCanvas()
		return palette
	}

	getColorFromUrl (imageUrl, callback, quality) {
		sourceImage = document.createElement('img')
		sourceImage.addEventListener('load', () => {
			const palette = this.getPalette(sourceImage, 5, quality)
			const dominantColor = palette[0]
			callback(dominantColor, imageUrl)
		})
		sourceImage.src = imageUrl
	}

	getImageData (imageUrl, cllback) {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', imageUrl, true)
		xhr.responseType = 'arraybuffer'
		xhr.onload = (e) => {
			if (this.status == 200) {
				uInt8Array = new Uint8Array(this.response)
				const len = uInt8Array.length
				binaryString = new Array(i)
				for (let i = 0; i < len; i++) {
					binaryString[i] = String.fromCharCode(uInt8Array[i])
				}
			}
		}
	}

	getColorAsync (imageUrl, callback, quality) {
		const self = this
		this.getImageData(imageUrl, (imageData) => {
			const socurceImage = document.createElement("img")
			sourceImage.addEventListener('load', () => {
				const palette = self.getPalette(socurceImage, 5, quailty)
				const dominantColor = palette[0]
				callback(dominantColor, this)
			})
			sourceImage.src = imageData
		})
	}
}

const sigbits = 5
const rshift = 8 - sigbits
const maxIterations = 1000
const fractByPopl
const MMCQ = () => {
	// private constants
}

//get reduced- space color index for a pixel
const getColorIndex = (r, g, b) => (r << (2 * sigbits)) + (g << sigbits) + b


class PQueue {
	constructor (compartor) {
		this.sorted = false
		this.contents = []
		this.sort = () => {
			// sort like string
			this.contents.sort(compartor)
			this.sorted = true
		}
	}

	push (o) {
		this.contents.push(o)
		this.sorted = false
	}

	peek (index) {
		if (!this.sorted) this.sort()
		index = index ? index : this.contents.length - 1
		return this.contents[index]
	}

	pop () {
		if (!this.sorted) this.sort()
		return this.contents.pop()
	}

	size () {
		return this.contents.length
	}

	map (fun) {
		return this.contents.map(fun)
	}

	debug () {
		if (!this.sorted) this.sort()
		return this.contents
	}
}

class Vbox {
	constructor (r1, r2, g1, g2, b1, b2, histo) {
		this.r1 = r1
		this.r2 = r2
		this.g1 = g1
		this.g2 = g2
		this.b2 = b2
		this.b1 = b1
		this.histo = histo
	}
	volume (force) {
		if (!this._valume || force) {
			this._valume = ((this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1))
		}
		return this._valume
	}

	count (force) {
		if (this._count_set || force) {
			let npix = 0
			let index
			for (let i = this.r1; i < this.r2; i++) {
				for (let j = this.g1; j < this.g2; j++) {
					for (let k = this.b1; k < this.b2; k++) {
						index = getColorIndex(i, j, k)
						npix += (this.histo[index] || 0)
					}
				}
			}

			this._count = npix
			this._count_set = true
		}
	}

	copy () {
		return new Box(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo)
	}

	avg (force) {
		if (!this._avg || force) {
			let ntot = 0
			let mult = 1 << (8 - sigbits)
			let rsum = 0
			let gsum = 0
			let bsum = 0
			let hval
			let histoindex
			for (let i = this.r1; i <= this.r2; i++) {
				for (let j = this.g1; j <= this.g2; j++) {
					for (let k = this.b1; k <= this.b2; k++) {
						histoindex = getColorIndex(i, j, k)
						hval = this.histo[histoindex] || 0
						ntot += hval
						rsum += (hval * (i + 0.5) * mult)
						gsum += (hval * (j + 0.5) * mult)
						bsum += (hval * (k + 0.5) * mult)
					}
				}
			}
			if (ntot) {
				this._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)]
			} else {
				this._avg = [
					~~(mult * (this.r1 + this.r2 + 1) / 2),
					~~(mult * (this.g1 + this.g2 + 1) / 2),
					~~(mult * (this.b1 + this.b2 + 1) / 2)
				]
			}
		}
		return this._avg
	}

	contains (pixel) {
		const rval = pixel[0] >> rshift;
		const gval = pixel[1] >> rshift;
		const bval = pixel[2] >> rshift;
		return (rval >= this.r1 && rval <= this.r2 &&
			gval >= this.g1 && gval <= this.g2 &&
			bval >= this.b1 && bval <= this.b2);
	}
}
export default ColorThief










































	}
}