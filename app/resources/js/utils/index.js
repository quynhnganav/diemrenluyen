import { differenceBy, isEmpty } from "lodash";

export const renderXepLoai = (diem) => ''

export const delaySearch = (func, time) => {
    let idTimeout = 0
    console.log(idTimeout)
    return (...args) => {
        clearTimeout(idTimeout)
        idTimeout = setTimeout(() => {
            console.log('run')
            func && func(...args)
        }, time)
    } 
}

export const toUnsigned = (string) => {
    if (!string) {
        return ''
    }
    return (
        string
            .replace(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a')
            .replace(/[ÀÁÂÃĂẠẢẤẦẨẪẬẮẰẲẴẶ]/g, 'A')
            .replace(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o')
            .replace(/[ÒÓÔÕƠỌỎỐỒỔỖỘỚỜỞỠỢ]/g, 'O')
            .replace(/[èéêẹẻẽếềểễệ]/g, 'e')
            .replace(/[ÈÉÊẸẺẼẾỀỂỄỆ]/g, 'E')
            .replace(/[ùúũưụủứừửữự]/g, 'u')
            .replace(/[ÙÚŨƯỤỦỨỪỬỮỰ]/g, 'U')
            .replace(/[ìíĩỉị]/g, 'i')
            .replace(/[ÌÍĨỈỊ]/g, 'I')
            .replace(/[ýỳỵỷỹ]/g, 'y')
            .replace(/[ÝỲỴỶỸ]/g, 'Y')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
            .replace(/\u02C6|\u0306|\u031B/g, '')
            // .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
    )
}

export function reducer(prevState, state) {
    return {
        ...prevState,
        ...state
    }
}


const setIDTree = () => {
    let i = 0;
    let diemHocTap = 0;

    const handleNode = (node, root, replaceID, level = 0, indexs, text, point) => {
        if (replaceID) node['id'] = ++i;
        else if (!node?.id) node['id'] = ++i;
        node['root'] = root;
        node['level'] = ++level;
        node['indexs'] = indexs;
        if (node?.isDiemHocTap) diemHocTap= node?.id
        text[`TenTieuChi-${node.id}`] = node?.TenTieuChi || ''
        let myPoint = node?.SoDiem || 0
        if (!isEmpty(node.children)) {
            myPoint = 0
            node?.children?.forEach((t, index) => {
                myPoint += handleNode(t, false, replaceID, level, [...indexs, index + 1], text, point)
            })
        } else delete node.children
        point[`SoDiem-${node.id}`] = myPoint
        return myPoint
    }

    return {
        renderTree: (trees, replaceID) => {
            const text = {}
            const point = {}
            let myPoint = 0
            trees?.forEach((node, index) => {
                myPoint += handleNode(node, true, replaceID, 0, [index + 1], text, point)
            })
            return [trees, text, point, myPoint, diemHocTap]
        },
        getIdCurrent: () => ++i
    }
}

const addNode = (trees, id) => {

    const findAndAdd = (node, id) => {
        if (id == node?.id) {
            if (!node?.children) node['children'] = []
            node?.children?.push({
                TenTieuChi: '',
                SoDiem: 0,
                Css: '',
            })
            return true
        }
        if (!isEmpty(node.children)) {
            for (let index = 0; index < node?.children?.length; index++) {
                const t = node?.children[index];
                const gen = findAndAdd(t, id);
                if (gen) return true
            }
        }
        return false
    }

    if (id === -1) {
        trees.unshift({
            TenTieuChi: '',
            SoDiem: 0,
            Css: '',
        })
        return trees;
    }

    if (id === -2) {
        trees.push({
            TenTieuChi: '',
            SoDiem: 0,
            Css: '',
        })
        return trees;
    }

    for (let index = 0; index < trees.length; index++) {
        const node = trees[index];
        const gen = findAndAdd(node, id);
        if (gen) return trees
    }
    return trees;
}

const removeNode = (trees, id) => {

    const findAndRemove = (node, id) => {
        if (isEmpty(node?.children)) return null
        if (node?.children?.find(n => n?.id == id)) {
            node['children'] = differenceBy(node?.children, [{ id }], 'id')
            return true
        }
        if (!isEmpty(node.children)) {
            for (let index = 0; index < node?.children?.length; index++) {
                const t = node?.children[index];
                const gen = findAndRemove(t, id);
                if (gen) return true
            }
        }
        return false
    }

    for (let index = 0; index < trees.length; index++) {
        const node = trees[index];
        if (node?.id == id) {
            trees = differenceBy(trees, [{ id }], 'id')
            return trees
        }
        const gen = findAndRemove(node, id);
        if (gen) return trees
    }
    return trees;
}

const setValuesTree = (trees, id, value, type) => {

    const findAndSetValue = (node, id, value, type) => {
        if (node?.id == id) {
            node[type] = value
            return true
        }
        if (!isEmpty(node.children)) {
            for (let index = 0; index < node?.children?.length; index++) {
                const t = node?.children[index];
                const gen = findAndSetValue(t, id, value, type);
                if (gen) return true
            }
        }
        return false
    }

    for (let index = 0; index < trees.length; index++) {
        const node = trees[index];
        if (node?.id == id) {
            node[type] = value
            return trees
        }
        const gen = findAndSetValue(node, id, value, type);
        if (gen) return trees
    }
    return trees;
}

const flattenTree = (trees) => {

    const data = []
    let point = 0
    let SoDiemSV = 0
    let SoDiemCBL = 0
    const pointForm = {}

    trees?.forEach((node, index) => {
        const [p, sv, cbl] = handleNodeFlatten(node, true, 0, [index + 1], data, pointForm)
        point += p
        SoDiemSV += sv
        SoDiemCBL += cbl
    })


    data.forEach(d => {
        delete d.children
    })

    return [data, point, pointForm, SoDiemSV, SoDiemCBL]

}

const handleNodeFlatten = (node, root, level = 0, indexs, data, point) => {
    const newNode = {
        ...node,
        root,
        level: ++level,
        index: indexs,
        SoDiemSV: node?.SoDiemSV || 0,
        SoDiemCBL: node?.SoDiemCBL || 0
    }
    data.push(newNode)
    let myPoint = node?.SoDiem || 0
    let SoDiemSV = node?.SoDiemSV || 0
    let SoDiemCBL = node?.SoDiemCBL || 0
    if (!isEmpty(node.children)) {
        newNode.isParent = true
        myPoint = 0
        SoDiemSV = 0
        SoDiemCBL = 0
        node?.children?.forEach((t, index) => {
            const [p, sv, cbl] = handleNodeFlatten(t, false, level, [...indexs, index + 1], data, point)
            myPoint += p
            SoDiemSV += sv
            SoDiemCBL += cbl
        })
    } else delete node.children
    newNode.SoDiem = myPoint
    newNode[`SoDiemSV-${node?.id}`] = SoDiemSV
    newNode[`SoDiemCBL-${node?.id}`] = SoDiemCBL
    point[`SoDiemSV-${node?.id}`] = SoDiemSV
    point[`SoDiemCBL-${node?.id}`] = SoDiemCBL
    return [myPoint, SoDiemSV, SoDiemCBL]
}

export {
    setIDTree,
    addNode,
    removeNode,
    setValuesTree,
    flattenTree
}