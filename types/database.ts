// Database type definitions

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface PlayoutSession {
  id: string;
  user_id: string;
  session_name: string | null;
  is_active: boolean;
  created_at: Date;
  last_active: Date;
}

export interface Asset {
  id: string;
  user_id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  created_at: Date;
}

export interface Theme {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  configuration: ThemeConfiguration;
  thumbnail_url: string | null;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ThemeConfiguration {
  riveFile?: string; // Path to the .riv file
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
  };
  zIndex: number;
}

export interface ImageLayer {
  id: string;
  assetId: string; // Reference to Asset.id
  assetUrl: string; // Full URL to the image
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
  role: 'logo' | 'banner' | 'overlay' | 'background' | 'custom';
}

export interface LayoutSettings {
  width: number; // Default: 1920
  height: number; // Default: 1080
  backgroundColor?: string;
  backgroundImage?: string;
}

export interface ThemeAsset {
  theme_id: string;
  asset_id: string;
  asset_role: string;
  position_order: number;
}

export interface Session {
  id: string;
  user_id: string;
  expires: Date;
  session_token: string;
  created_at: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Query filter types
export interface UserFilter {
  email?: string;
  id?: string;
}

export interface ThemeFilter {
  user_id?: string;
  is_default?: boolean;
}

export interface AssetFilter {
  user_id?: string;
  file_type?: string;
}


