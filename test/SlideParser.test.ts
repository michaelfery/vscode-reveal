// tslint:disable-next-line:no-implicit-dependencies
import { should } from 'chai'
import * as fs from 'fs'
import * as matter from 'gray-matter'
import * as path from 'path'
// import * as vscode from 'vscode'
import { countLines, parseSlides } from '../src/SlideParser'
import { IExtensionOptions, Configuration, IDocumentOptions, defaultConfiguration ,getDocumentOptions } from '../src/Configuration';

// const sampleFile = fs.readFileSync('../sample.md').toString()

const config = getDocumentOptions(defaultConfiguration)

config.notesSeparator= 'note:'
config.separator= '^[\r\n?|\n]---[\r\n?|\n]$',
config.verticalSeparator= '^[\r\n?|\n]--[\r\n?|\n]$'

should()
describe('Slide parser tests', function () {
  let slideContent = ''

  before(function () {
    const currentPath = path.dirname(this!.test!.parent!.file!)
    const samplePath = path.join(currentPath, '../../sample.md')
    const data = fs.readFileSync(samplePath)
    slideContent = matter(data.toString()).content
  })

  it('Shoud count simple slides', function () {
    const slides = parseSlides(slideContent, config)
    slides.should.has.lengthOf(26)
  })

  it('First slide should have correct number of lines', function () {
    const slides = parseSlides(slideContent, config)

    const expectedLineCount = [7, 6]

    expectedLineCount.forEach((expected, i) => {
      countLines(slides[i].text).should.equal(expected)
    })
  })
})
