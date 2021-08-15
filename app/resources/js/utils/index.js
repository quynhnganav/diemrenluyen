import { differenceBy, isEmpty } from "lodash";

const setIDTree = () => {
    let i = 0;

    const handleNode = (node, root, replaceID, level = 0, indexs, text, point) => {
        if (replaceID) node['id'] = ++i;
        else if (!node?.id) node['id'] = ++i;
        node['root'] = root;
        node['level'] = ++level;
        node['indexs'] = indexs;
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
            return [trees, text, point, myPoint]
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

export {
    setIDTree,
    addNode,
    removeNode,
    setValuesTree
}