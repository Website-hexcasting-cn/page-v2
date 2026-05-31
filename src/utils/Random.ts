function GetRandom(Min: number, Max: number): number {
  let rngState = Date.now() ^ 0xf3b3d7025f
  
  function nextUint32(): number {
    let x = rngState
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    rngState = x >>> 0
    return rngState
  }
  
  function randomRange(min: number, max: number): number {
    const range = max - min + 1
    const randVal = nextUint32() % range
    return min + randVal
  }
  
  return randomRange(Min, Max)
}

export { GetRandom }
