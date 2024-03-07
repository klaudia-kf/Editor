import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';
import styles from '../page.module.scss';
import { Icon } from '@fluentui/react';

interface IIconProps {
    file: File | undefined;
    onClick?: (event: React.MouseEvent) => void;
    isIcon?: boolean;
}

export class FileService {
    

    static truncatedString = (input: string, length: number) => {
        if (input.length <= length)
            return input;

        return input.substring(0, length) + "...";
    }

    static isImage = (file: File): boolean => {
        return (file.type.indexOf('image') > -1);
    }

    static isVideo = (file: File): boolean => {
        return (file.type.indexOf('video') > -1);
    }

    static isMedia = (file: File | undefined): boolean => {
        if (!file)
            return false;

        return (this.isImage(file) || this.isVideo(file));
    }

    static getExtension = (input: string): string => {
        const parts = input.split(".");
        return parts[parts.length - 1];
    }

    static Icon = (props: IIconProps): JSX.Element => {
        const onClick = (event: React.MouseEvent): void => {
            if (!!props.onClick) {
                props.onClick(event);
            }
        };

        if (!props.file)
            return <></>;


        if (!props.isIcon && this.isVideo(props.file)) {
            return (
                <embed className={styles.previewContent} src={URL.createObjectURL(props.file)} onClick={onClick} />
            );
        }
        if (this.isImage(props.file)) {
            return (
                <img className={(!!props.isIcon) ? styles.iconImage : styles.previewContent} src={URL.createObjectURL(props.file)} onClick={onClick} />
            );
        }

        // const icons: IMappedIcon[] = mappedIcons.filter((icon) => props.file!.type.indexOf(icon.fileType) > -1);

        return (
            // <Icon {...getFileTypeIconProps({ extension: (icons.length > 0) ? icons[0]?.fileExtension : "", size: 48 })} onClick={onClick} />
            <Icon {...getFileTypeIconProps({ extension: this.getExtension(props.file.name), size: 48 })} onClick={onClick} />
        );
    }
}