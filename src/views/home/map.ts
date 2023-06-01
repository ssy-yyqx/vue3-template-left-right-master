import mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'
// 初始化地图
export function initMap (id: string) {
  mapboxgl.accessToken = 'pk.eyJ1IjoibGlkYW0iLCJhIjoiY2t6Z205OW5kM3NzNzJ3bXp6MDA3anZhdiJ9.-m0_v00uae0XY5QLJuIXfA'
  const tdtVec = {
    // 类型为栅格瓦片
    type: 'raster',
    tiles: [
      // 请求地址
      'http://t0.tianditu.com/vec_w/wmts?tk=e90d56e5a09d1767899ad45846b0cefd&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles'
    ],
    // 分辨率
    tileSize: 256
  }
  const tdtCva = {
    type: 'raster',
    tiles: [
      'http://t0.tianditu.com/cva_c/wmts?tk=e90d56e5a09d1767899ad45846b0cefd&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles'
    ],
    tileSize: 256
  }
  const map = new mapboxgl.Map({
    container: id,
    style: {
      version: 8,
      sources: {
        // tdtVec: tdtVec,
        tdtCva: tdtCva
      },
      layers: [
        // {
        //   // 图层id，要保证唯一性
        //   id: 'tdtVec',
        //   // 图层类型
        //   type: 'raster',
        //   // 数据源
        //   source: 'tdtVec',
        //   // 图层最小缩放级数
        //   minzoom: 0,
        //   // 图层最大缩放级数
        //   maxzoom: 17
        // },
        {
          id: 'tdtCva',
          type: 'raster',
          source: 'tdtCva',
          minzoom: 0,
          maxzoom: 17
        }
      ],
      // 地图中心点
      center: [113.679943564, 22.559617265],
      zoom: 8
    }
  })
  const arcs: Array<Array<Array<number>>> = []
  const step = 100

  // 创建二阶贝塞尔曲线
  const computeControlPoint = (ps: number[], pe: number[], arc = 0.3) => {
    const deltaX = pe[0] - ps[0]
    const deltaY = pe[1] - ps[1]
    const theta = Math.atan(deltaY / deltaX)
    const len = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) / 2 * arc
    const newTheta = theta - Math.PI / 2
    return [
      (ps[0] + pe[0]) / 2 + len * Math.cos(newTheta),
      (ps[1] + pe[1]) / 2 + len * Math.sin(newTheta)
    ]
  }

  interface Feature {
    type: string,
      geometry: {
        type: string,
        coordinates: number[][]
      }
  }
  interface FeatureCollection {
    type: string,
    features: Feature[]
  }
  // 曲线分段
  const split = (lines: FeatureCollection) => {
    for (const line of lines.features) {
      const arc: number[][] = []
      line.geometry.coordinates = [
        line.geometry.coordinates[0],
        computeControlPoint(line.geometry.coordinates[0], line.geometry.coordinates[1]),
        line.geometry.coordinates[1]
      ]
      const bezier = turf.bezierSpline(line)
      const len = turf.length(bezier)
      for (let i = 0; i < len; i += len / step) {
        const p = turf.along(bezier, i)
        arc.push(p.geometry.coordinates)
      }
      arcs.push(arc)
    }
  }
  // 线集合
  const lines: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [113.679943564, 22.559617265],
            [114.679943564, 23.559617265]
          ]
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [110.679943564, 22.559617265],
            [110.679943564, 28.559617265]
          ]
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [112.679943564, 22.559617265],
            [112.379943564, 30.559617265]
          ]
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [111.679943564, 22.559617265],
            [111.479943564, 29.559617265]
          ]
        }
      }
    ]
  }
  split(lines)
  map.on('load', () => {
    map.addSource('segment', {
      type: 'geojson',
      lineMetrics: true,
      data: null
    })
    map.addLayer({
      id: 'segment',
      source: 'segment',
      type: 'line',
      paint: {
        'line-color': 'red',
        'line-width': 2,
        'line-gradient': [
          'interpolate',
          ['linear'],
          ['line-progress'],
          0,
          'rgba(255, 255, 255, 0.1)',
          0.8,
          'rgba(255, 0, 0, 0.6)',
          1,
          'red'
        ]
      }
    })
    const source = map.getSource('segment')

    const segments: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    }
    let counter = 0
    // 动画
    const animate = () => {
      if (counter === step) {
        counter = 0
        segments.features.forEach((item) => {
          item.geometry.coordinates.length = 0
        })
      }

      arcs.forEach((arc, i) => {
        if (!segments.features[i]) {
          segments.features[i] = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: []
            }
          }
        }
        segments.features[i].geometry.coordinates.push(arc[counter])
      })

      source.setData(segments)
      requestAnimationFrame(animate)
      counter++
    }
    animate()
  })
}
