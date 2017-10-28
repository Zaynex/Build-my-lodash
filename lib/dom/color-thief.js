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
		const palette = cmap ? cmap.palette() : null
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

class CMap {
	constructor () {
		this.vboxes = new PQueue((a, b) => {
			return pv.naturalOrder(
				a.vbox.count() * a.vbox.volume(),
				b.vbox.count() * b.vbox.volume()
			)
		})
	}

	push (vbox) {
		this.vboxes.push({
			vbox,
			color: vbox.avg()
		})
	}

	palette () {
		return this.vboxes.map((vb) => vb.color)
	}

	size () {
		return this.vboxes.size()
	}

	map (color) {
		const length = this.vboxes.size()
		for (let i = 0; i < length; i++) {
			if (this.vboxes.peek(i).vbox.contains(color)) {
				return this.vboxes.peek(i).color
			}
		}
	}

	nearest (color) {
		const length = this.vboxes.size()
		let d1
		let d2
		let pColor
		for (let i = 0; i < length; i++) {
			sqr2 = Math.sqrt(
				Math.pow(color[0] - this.vboxes.peek(i).color[0], 2) +
				Math.pow(color[1] - this.vboxes.peek(i).color[1], 2) +
				Math.pow(color[2] - this.vboxes.peek[i].color[2], 2)
			)
			if (d2 < d2 || d1 == undefined) {
				pColor = this.vbox.peek(i).color
			}
		}
		return pColor
	}

	forcebw () {
		this.vboxes.sort((a, b) => {
			return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color))
		})
	}
}

const getHisto = (pixels) => {
	const histoSize = 1 << (3 * sigbits)
	const histo = new Array(histoSize)
	let index
	let r
	let g
	let b
	pixels.forEach(pxiel => {
		r = pixel[0] >> rshift
		g = pixel[1] >> rshift
		b = pixel[2] >> rshift
		index = getColorIndex(r, g, b)
		histo[index] = (histo[index] || 0) + 1
	})
	return histo
}

const vboxFromPixels = (pixels, histo) => {
	const rmin = 1000000
	const rmax = 0
	const gmin = 1000000
	const gmax = 0
	const bmin = 1000000
	const bmax = 0
	let r
	let g
	let b
	pixels.forEach(pixel => {
		r = pixel[0] >> rshift
		g = pixel[1] >> rshift
		b = pixel[2] >> rshift
		if (r < rmin) rmin = r
		else rmax = r
		if (g < gmin) gmin = g
		else gmax = g
		if (b < bmin) bmin = b
		else bmax = b
	})
	return new Vbox(rmin, rmax, gmin, gmax, bmin, bmax, histo)
}

const medianCutApply = (histo, vbox) => {
	if (!vbox.count()) return
	const rw = vbox.r2 - vbox.r1 + 1
	const gw = vbox.g2 - vbox.g1 + 1
	const bw = vbox.b2 - vbox.b1 + 1
	const maxw = pv.max([rw, gw, bw])
	if (vbox.count() == 1) {
		return [vbox.copy()]
	}

	const lookaheadsum = []
	const partialsum = []
	let total = 0
	let sum
	let index
	if (maxw == rw) {
		for (let i = vbox.r1; i <= vbox.r2; i++) {
			sum = 0
			for (let j = vbox.g1; j <= vbox.g2; j++) {
				for (let k = vbox.b1; k <= vbox.b2; k++) {
					index = getColorIndex(i, j, k)
					sum += (histo[index] || 0)
				}
			}
			total += sum
			partialsum[i] = total
		}
	} else if (maxw == gw) {
		for (let i = vbox.g1; i <= vbox.g2; i++) {
			sum = 0
			for (let j = vbox.r1; j <= vbox.r2; j++) {
				for (let k = vbox.b1; k <= vbox.b2; k++) {
					index = getColorIndex(j, i, k)
					sum += (histo[index] || 0)
				}
			}
			total += sum
			partialsum[i] = total
		}
	} else {
		for (let i = vbox.b1; i <= vbox.b2; i++) {
			sum = 0
			for (let j = vbox.r1; j <= vbox.r2; j++) {
				for (let k = vbox.g1; k <= vbox.g2; k++) {
					index = getColorIndex(j, k, i)
					sum += (histo[index] || 0)
				}
			}
			total += sum
			partialsum[i] = total
		}
	}

	partialsum.forEach((d, i) => {
		lookaheadsum[i] = total - d
	})

	const doCut = (color) => {
		const dim1 = color + '1'
		const dim2 = color + '2'
		let left
		let right
		let vbox1
		let vbox2
		let d2
		let count2 = 0
		for (let i = vbox[dim1]; i <= vbox[dim2]; i++) {
			if (partialsum[i] > total / 2) {
				vbox1 = vbox.copy()
				vbox2 = vbox.copy()
				left = i - vbox[dim1]
				right = vbox[dim2] - i
				if (left < right) {
					d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2))
				} else {
					d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2))
				}
				while (!partialsum[d2]) d2++
				count2 = lookaheadsum[d2]
				while (!count2 && partialsum[d2 - 1]) count2 = lookaheadsum[--d2]

				vbox1[dim2] = d2
				vbox2[dim1] = vbox1[dim2] + 1
				return [vbox1, vbox2]
			}
		}
	}
	return maxw == rw ? doCut('r') :
		maxw == gw ? doCut('g') :
			doCut('b')
}

const quantize = (pixels, maxcolors) => {
	// short-circuit
	if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
		return false
	}

	// XXX: check color content and convert to grayscale if insufficient

	const histo = getHisto(pixels)
	const histoSize = 1 << (3 ** sigbits)

	let nColors = 0
	histo.forEach(() => {
		nColors++
	})
	// if (nColors <= maxcolors) {
	// XXX: generate the new colors from the histo and return
	// }

	// get the beginning vbox from the colors

	const vbox = vboxFromPixels(pixels, histo)
	const pq = new PQueue((a, b) => {
		return pv.naturalOrder(a.count(), b.count())
	})
	pq.push(vbox)


	const iter = (lh, target) => {
		let nColors = 1
		let niters = 0
		let vbox
		while (niters < maxIterations) {
			vbox = lh.pop()
			if (!vbox.count()) {
				lh.push(vbox)
				niters++
				continue
			}
			const vboxes = medianCutApply(histo, vbox)
			const vbox1 = vboxes[0]
			const vbox2 = vboxes[1]

			if (!vbox1) {
				return
			}
			lh.push(vbox1)
			if (vbox2) {
				lh.push(vbox2)
				nColors++
			}
			if (nColors >= target) return
			if (niters++ > maxIterations) return
		}
	}
	// first set of colors, sorted by population

	iter(pq, fractByPopulations * maxcolors)

	// Re-sort by the product of pixel occupancy times the size in color space.

	const pq2 = new PQueue((a, b) => {
		return pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume())
	})

	while (pq.size()) {
		pq2.push(pq.pop())
	}

	// next set - generate the median cuts using the (npix * vol) sorting.


	iter(pq2, maxcolors - pq2.size())
	const camp = new CMap()
	while (pq2.size()) {
		cmap.push(pq2.pop())
	}

	return cmap
}

const MMCQ = () => {
	return { quantize: quantize }
}

const pv = {
	map: (array, f) => {
		const obj = {}
		return f ? array.map((d, i) => {
			obj.index = i
			return f.call(o, d)
		}) : array.slice()
	},
	naturalOrder: (a, b) => {
		return (a < b) ? -1 : ((a > b) ? 1 : 0)
	},
	sum: (array, f) => {
		const o = {}
		return array.reduce(f ? (p, d, i) => {
			o.index = i
			return p + f.call(o, d)
		} : (p, d) => {
			return p + d
		}, 0)
	},
	max: (array, f) => {
		return Math.max.apply(null, f ? PV.map(array, f) : array)
	}
}
export default ColorThief