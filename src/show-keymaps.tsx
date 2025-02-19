import { Detail, Cache, ActionPanel, Action } from "@raycast/api";
import { useState } from "react";

const cache = new Cache();

export default function Command() {
    const [layer, setLayer] = useState(Number(cache.get('layer')) || 0);
    const [showAnnotation, setShowAnnotation] = useState(cache.get('annotation') === 'true');

    const nextLayer = () => {
        const layerIndex = Math.min(Math.max(layer + 1, 0), 3);
        
        cache.set('layer', `${layerIndex}`)
        setLayer(layerIndex)
    };

    const prevLayer = () => {
        const layerIndex = Math.min(Math.max(layer - 1, 0), 3);
        
        cache.set('layer', `${layerIndex}`)
        setLayer(layerIndex)
    };

    const toggleAnnotation = () => {
        cache.set('annotation', `${!showAnnotation}`)
        setShowAnnotation(!showAnnotation)
    }
    
    return <Detail
        markdown={`![](keymap/${showAnnotation ? 'annotation' : 'layer'}_${layer}.png)`}
        navigationTitle={`Keyball 44 - Layer ${layer}`}
        actions={
            <ActionPanel title="Keymaps">
                <Action title={`アノテーションを${showAnnotation ? '表示' : '隠す'}`} shortcut={{ modifiers: [], key: 'arrowUp' }} onAction={toggleAnnotation} />
                <Action title="次のレイヤー" shortcut={{ modifiers: [], key: 'arrowRight' }} onAction={nextLayer} />
                <Action title="前のレイヤー" shortcut={{ modifiers: [], key: 'arrowLeft' }} onAction={prevLayer} />
            </ActionPanel>
        }
    />
}