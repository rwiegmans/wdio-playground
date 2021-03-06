describe('Sauce Performance Jankiness Testing', () => {
    it('tests jankiness with non optimized behavior', () => {
        browser.url('https://googlechrome.github.io/devtools-samples/jank/')

        const addBtn = $('.add')
        for (let i = 0; i < 10; i += 1) {
            addBtn.click()
        }

        const jankiness = browser.execute('sauce:jankinessCheck')
        /**
         * returns following JSON object
         *
         * {
               "url":"https://googlechrome.github.io/devtools-samples/jank/",
               "timestamp":1570026846192,
               "value":{
                  "metrics":{
                     "averageFPS":30.37006789013138,
                     "scriptingTime":713,
                     "renderingTime":45,
                     "otherTime":1598,
                     "idleTime":2122,
                     "forcedReflowWarningCounts":440,
                     "scrollTime":5210,
                     "paintingTime":732,
                     "memoryUsageDiff":-2964452
                  },
                  "diagnostics":{
                     "layoutUpdateScore":0.9869911007302723,
                     "fpsScore":0.5061677981688564,
                     "idleDurationScore":0.4072936660268714,
                     "memoryUsageScore":1
                  }
               },
               "score":0.6428077742596429,
               "loaderId":"b0099410-e521-11e9-b752-8375edd9807f",
               "type":"scroll"
         * }
         */

        expect(jankiness.score).toBeLessThan(0.7)
    })

    it('should get better results after optimizing animation', () => {
        const optimizeBtn = $('.optimize')
        optimizeBtn.click()

        const jankiness = browser.execute('sauce:jankinessCheck')

        expect(jankiness.score).toBeGreaterThan(0.7, `Score (${jankiness.score}) is lower than 0.9`)
    })
});
