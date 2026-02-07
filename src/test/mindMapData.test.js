import { describe, it, expect } from 'vitest'
import mindMapData from '../mindMapData'

describe('mindMapData integrity', () => {
  describe('structure', () => {
    it('should have a center node', () => {
      expect(mindMapData.center).toBeDefined()
      expect(mindMapData.center.label).toBeDefined()
      expect(mindMapData.center.color).toBeDefined()
    })

    it('should have level1 nodes (pillars)', () => {
      expect(mindMapData.level1).toBeDefined()
      expect(Array.isArray(mindMapData.level1)).toBe(true)
      expect(mindMapData.level1.length).toBeGreaterThan(0)
    })

    it('should have methodologies', () => {
      expect(mindMapData.methodologies).toBeDefined()
      expect(Array.isArray(mindMapData.methodologies)).toBe(true)
      expect(mindMapData.methodologies.length).toBeGreaterThan(0)
    })
  })

  describe('level1 nodes', () => {
    it('each pillar should have required fields', () => {
      mindMapData.level1.forEach((pillar, index) => {
        expect(pillar.id, `pillar ${index} missing id`).toBeDefined()
        expect(pillar.label, `pillar ${index} missing label`).toBeDefined()
        expect(pillar.color, `pillar ${index} missing color`).toBeDefined()
      })
    })

    it('pillar colors should be valid hex codes', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/
      mindMapData.level1.forEach(pillar => {
        expect(pillar.color).toMatch(hexRegex)
      })
    })

    it('pillars should have children arrays referencing methodologies', () => {
      const methodologyIds = new Set(mindMapData.methodologies.map(m => m.id))
      mindMapData.level1.forEach(pillar => {
        if (pillar.children) {
          pillar.children.forEach(childId => {
            expect(methodologyIds.has(childId),
              `pillar ${pillar.id} references unknown child: ${childId}`
            ).toBe(true)
          })
        }
      })
    })
  })

  describe('methodologies', () => {
    it('each methodology should have required fields', () => {
      mindMapData.methodologies.forEach((method, index) => {
        expect(method.id, `methodology ${index} missing id`).toBeDefined()
        expect(method.label, `methodology ${index} missing label`).toBeDefined()
        expect(method.color, `methodology ${index} missing color`).toBeDefined()
      })
    })

    it('methodology colors should be valid hex codes', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/
      mindMapData.methodologies.forEach(method => {
        expect(method.color).toMatch(hexRegex)
      })
    })
  })

  describe('media items', () => {
    const collectAllMedia = () => {
      const allMedia = []

      // Center media
      if (mindMapData.center?.media) {
        allMedia.push(...mindMapData.center.media.map(m => ({ ...m, source: 'center' })))
      }

      // Level1 media
      mindMapData.level1?.forEach(pillar => {
        if (pillar.media) {
          allMedia.push(...pillar.media.map(m => ({ ...m, source: pillar.id })))
        }
      })

      // Methodology media
      mindMapData.methodologies?.forEach(method => {
        if (method.media) {
          allMedia.push(...method.media.map(m => ({ ...m, source: method.id })))
        }
      })

      // Futurist media
      mindMapData.futurists?.forEach(futurist => {
        if (futurist.media) {
          allMedia.push(...futurist.media.map(m => ({ ...m, source: futurist.id })))
        }
      })

      // Futures Societies media
      mindMapData.futuresSocieties?.forEach(society => {
        if (society.media) {
          allMedia.push(...society.media.map(m => ({ ...m, source: society.id })))
        }
      })

      // Speculative Futures media
      mindMapData.speculativeFutures?.scenarios?.forEach(scenario => {
        if (scenario.media) {
          allMedia.push(...scenario.media.map(m => ({ ...m, source: scenario.id })))
        }
      })

      // Positive Futures media
      mindMapData.positiveFutures?.milestones?.forEach(milestone => {
        if (milestone.media) {
          allMedia.push(...milestone.media.map(m => ({ ...m, source: milestone.id })))
        }
      })

      return allMedia
    }

    it('should have media items defined', () => {
      const allMedia = collectAllMedia()
      expect(allMedia.length).toBeGreaterThan(0)
    })

    it('each media item should have required fields', () => {
      const allMedia = collectAllMedia()
      allMedia.forEach((item, index) => {
        expect(item.type, `media ${index} missing type`).toBeDefined()
        expect(item.title, `media ${index} missing title`).toBeDefined()
        expect(item.url, `media ${index} missing url`).toBeDefined()
      })
    })

    it('media types should be valid', () => {
      const validTypes = ['video', 'article', 'document', 'image', 'podcast']
      const allMedia = collectAllMedia()
      allMedia.forEach(item => {
        expect(validTypes).toContain(item.type)
      })
    })

    it('URLs should have valid format', () => {
      const allMedia = collectAllMedia()
      allMedia.forEach(item => {
        const isValidUrl = item.url.startsWith('http://') ||
                          item.url.startsWith('https://') ||
                          item.url.startsWith('/')
        expect(isValidUrl, `Invalid URL format: ${item.url}`).toBe(true)
      })
    })
  })

  describe('futurists', () => {
    it('should have futurists defined if present', () => {
      if (mindMapData.futurists) {
        expect(Array.isArray(mindMapData.futurists)).toBe(true)
        mindMapData.futurists.forEach((futurist, index) => {
          // Futurists use 'label' not 'name'
          expect(futurist.label, `futurist ${index} missing label`).toBeDefined()
          expect(futurist.id, `futurist ${index} missing id`).toBeDefined()
        })
      }
    })
  })

  describe('futuresSocieties', () => {
    it('should have societies defined if present', () => {
      if (mindMapData.futuresSocieties) {
        expect(Array.isArray(mindMapData.futuresSocieties)).toBe(true)
        mindMapData.futuresSocieties.forEach((society, index) => {
          // Societies use 'label' not 'name'
          expect(society.label, `society ${index} missing label`).toBeDefined()
          expect(society.id, `society ${index} missing id`).toBeDefined()
        })
      }
    })
  })
})
