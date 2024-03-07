// Define an interface for a file with description
export interface FileInfo  {
    doc: File;
    description?: string;
    isComparisonImage?: boolean; // Optional boolean attribute with default value false
}
