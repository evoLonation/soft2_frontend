export default {
    co_net: {
        nodes: [
            {
                id: '0',
                label: '赵正阳',
                size: 40,
                type: 'major',
                style: {
                    fill: '#363636',
                },
                co_num: 100,
            },
            {
                id: '1',
                label: '刘禹宏',
                size: 30,
                style: {
                    fill: '#4F4F4F'
                },
                co_num: 50
            },
            {
                id: '2',
                label: '姜星如',
                size: 30,
                style: {
                    fill: '#1C1C1C',
                },
                co_num: 50
            },
            {
                id: '3',
                label: '李杭',
                size: 25,
                style: {
                    fill: '#1C1C1C'
                },
                co_num: 25
            },
            {
                id: '4',
                label: '龙亿舟',
                size: 35,
                style: {
                    fill: '#828282'
                },
                co_num: 75,
            },
            {
                id: '5',
                label: '王毅峰',
                size: 25,
                style: {
                    fill: '#4F4F4F'
                },
                co_num: 25,
            },
            {
                id: '6',
                label: '陶海榕',
                size: 20,
                style: {
                    fill: '#E8E8E8'
                },
                co_num: 10
            },
            {
                id: '7',
                label: '李卓群',
                size: 27,
                style: {
                    fill: '#696969'
                },
                co_num: 24,
            },
        ],
        edges: [
            {
              source: '0',
              target: '1'
            },
            {
                source: '0',
                target: '2'
            },
            {
                source: '0',
                target: '3'
            },
            {
                source: '0',
                target: '4'
            },
            {
                source: '0',
                target: '5'
            },
            {
                source: '0',
                target: '6'
            },
            {
                source: '0',
                target: '7'
            },
        ]
    },
    ci_net: {
        nodes: [
            {
                id: '0',
                label: '赵正阳',
                size: 40,
                type: 'major',
                style: {
                    fill: '#363636',
                },
                ci_num: 100,
            },
            {
                id: '1',
                label: '刘禹宏',
                size: 30,
                style: {
                    fill: '#4F4F4F'
                },
                ci_num: 50
            },
            {
                id: '2',
                label: '姜星如',
                size: 30,
                style: {
                    fill: '#1C1C1C',
                },
                ci_num: 50
            },
            {
                id: '3',
                label: '李杭',
                size: 25,
                style: {
                    fill: '#1C1C1C'
                },
                ci_num: 25
            },
            {
                id: '4',
                label: '龙亿舟',
                size: 35,
                style: {
                    fill: '#828282'
                },
                ci_num: 75,
            },
            {
                id: '5',
                label: '王毅峰',
                size: 25,
                style: {
                    fill: '#4F4F4F'
                },
                ci_num: 25,
            },
        ],
        edges: [
            {
                source: '0',
                target: '1'
            },
            {
                source: '0',
                target: '2'
            },
            {
                source: '0',
                target: '3'
            },
            {
                source: '0',
                target: '4'
            },
            {
                source: '0',
                target: '5'
            },
        ]
    }
}