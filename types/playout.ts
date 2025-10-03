// Playout Window Types

export interface PlayoutConfig {
  id: string;
  riveFile?: string;
  textLayers: TextLayer[];
  imageLayers: ImageLayer[];
  layoutSettings: LayoutSettings;
}

export interface TextLayer {
  id: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
  style: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    textShadow?: string;
    letterSpacing?: string;
  };
  zIndex: number;
  visible?: boolean;
}

export interface ImageLayer {
  id: string;
  url: string;
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  rotation?: number;
  opacity?: number;
  zIndex: number;
  visible?: boolean;
}

export interface LayoutSettings {
  width: number;
  height: number;
  backgroundColor?: string;
  backgroundImage?: string;
}

// WebSocket Events
export interface PlayoutUpdateEvent {
  type: 'config_update' | 'text_update' | 'image_update' | 'theme_change';
  data: Partial<PlayoutConfig>;
  timestamp: number;
}

export interface WebSocketMessage {
  event: string;
  data: unknown;
  playoutId?: string;
}

